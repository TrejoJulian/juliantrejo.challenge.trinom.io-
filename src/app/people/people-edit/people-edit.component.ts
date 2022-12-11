import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { PeopleService } from 'src/app/services/people.service';
import { Course } from '../model/course.model';
import { People } from '../model/people.model'; 

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css']
})
export class PeopleEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  personForm: FormGroup;
  courses: Course[]; 
  invalidCourseName: boolean = false;
  usedEmailError: string = '';
  editedPerson: People;
  constructor(private router: Router, private route: ActivatedRoute,
              private peopleService: PeopleService, private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        if (this.editMode) {
          this.peopleService.getPerson(this.id).subscribe(person =>{
            this.editedPerson = person;
            this.initEditForm();
          }, error => {
            this.router.navigate(['/not_found']);
          })
        }
      }
    );
    this.courseService.fetchCourses().subscribe(courses => this.courses = courses);
  }

  onAddCourse() {
    (<FormArray>this.personForm.get('courses')).push(
      new FormGroup({
        'course': new FormControl(null, Validators.required),
      })
    );
  }


  onSubmit() {
    if(! this.thereIsSomeInvalidName(this.personForm.value['courses'])){
      this.invalidCourseName=false;
      this.handleSubmit(this.generatePersonFromForm());
    } else {
    this.invalidCourseName = true;
    }
  }

  get controls() {
    return (<FormArray>this.personForm.get('courses')).controls;
  }

  onCancel() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  onDeleteCourse(index: number) {
    (<FormArray>this.personForm.get('courses')).removeAt(index);
  }

  private initForm() {
    let id = this.id;
    let first_name = '';
    let last_name = '';
    let email = '';
    let created_at = this.getFormattedDate();
    let updated_at = this.getFormattedDate();
    let courses = new FormArray([]);

    this.personForm = new FormGroup({
      'id': new FormControl(id, Validators.required),
      'first_name': new FormControl(first_name, [Validators.required, Validators.maxLength(30), this.noWhitespaceValidator]),
      'last_name': new FormControl(last_name, [Validators.required, Validators.maxLength(30), this.noWhitespaceValidator]),
      'email': new FormControl(email, [Validators.email, Validators.required, Validators.maxLength(254)]),
      'created_at': new FormControl(created_at, Validators.required),
      'updated_at': new FormControl(updated_at, Validators.required),
      'courses': courses
    });
  }

  private initEditForm() {
    let courses = new FormArray([]);
    
    if(this.editedPerson['courses']) {
      for (let course of this.editedPerson.courses) {
        courses.push(
          new FormGroup({
            'course': new FormControl(this.formatCourseForView(course), Validators.required)
          })
        )
      }
    }

    this.personForm = new FormGroup({
      'id': new FormControl(this.id, Validators.required),
      'first_name': new FormControl(this.editedPerson.first_name, [Validators.required, Validators.maxLength(30), this.noWhitespaceValidator]),
      'last_name': new FormControl(this.editedPerson.last_name, [Validators.required, Validators.maxLength(30), this.noWhitespaceValidator]),
      'email': new FormControl(this.editedPerson.email, [Validators.email, Validators.required, Validators.maxLength(254)]),
      'created_at': new FormControl(this.editedPerson.created_at, Validators.required),
      'updated_at': new FormControl(this.getFormattedDate(), Validators.required),
      'courses': courses
    });
  }

  private getFormattedDate() {
    return new Date().toLocaleString().replaceAll('/','-').replace(',','');
  }

  private formatCourseForView(course: Course) {
    return course.name + " - " + course.level.name; 
  }

  private getCourseFromViewFormat(viewFormattedCourse: string) {
    const fullCourseName = viewFormattedCourse.split("-")[0].trim();
    const onlyTheName = viewFormattedCourse.toLowerCase();
    return this.courses.find((course: Course) => {
      return (course.name === fullCourseName || course.name.toLowerCase() === onlyTheName);
    })
  }

  private handleSubmit(person: People) {
    if(this.editMode) {
      this.handleEditResponse(this.peopleService.updatePerson(this.id, person));
    } else{
      this.handleEditResponse(this.peopleService.addPerson(person))
    }
  }

  private handleEditResponse(response) {
    response.subscribe(
      (_) => {
        this.peopleService.fetchPeople();
        this.router.navigate(['/people']);
      },
      (error) => {
        this.usedEmailError = error.error.errors.email[0];
      } );
  }

  private generatePersonFromForm() {
    return new People(
      this.personForm.value['id'],
      this.personForm.value['first_name'],
      this.personForm.value['last_name'],
      this.personForm.value['email'],
      this.personForm.value['created_at'],
      this.personForm.value['updated_at'],
      this.personForm.value['courses'].map(courseView => {
        return this.getCourseFromViewFormat(courseView.course)
      })
    )
  }

  private thereIsSomeInvalidName(courseNames): boolean {
    return courseNames.some(courseName => {
      return !this.correspondsToSomeCourse(courseName.course)
    })
  }

  private correspondsToSomeCourse(courseName: string) {
    const fullCourseName = courseName.split("-")[0].trim();
    const onlyTheName = courseName.toLowerCase();
    return this.courses.some(course => {
      return (course.name === fullCourseName || course.name.toLowerCase() === onlyTheName);
    })
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isEmpty = (control.value || '') === '';
    const isValid = !isWhitespace || isEmpty;
    return isValid ? null : { 'whitespace': true };
}
  
}
