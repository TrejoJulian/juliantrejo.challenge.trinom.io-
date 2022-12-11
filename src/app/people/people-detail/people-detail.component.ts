import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people.service';
import { People } from '../model/people.model';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit {
  person: People;
  id: number;

  constructor(private peopleService: PeopleService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.peopleService.getPerson(this.id).subscribe(person =>{
          this.person = person
        }, error => {
          this.router.navigate(['/not_found']);
        })
      }
    );
  }

  onEditPerson() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePerson() {
    this.peopleService.deletePerson(this.id);
    this.router.navigate(['/people']);
  }
}
