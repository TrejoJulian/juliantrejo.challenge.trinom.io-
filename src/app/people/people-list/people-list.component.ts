import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PeopleService } from 'src/app/services/people.service';
import { People } from '../model/people.model';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit, OnDestroy {
  people: People[];
  suscription: Subscription;
  searchText: string = '';
  page: number;
  pageSize: number = 5;

  constructor(private peopleService: PeopleService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.suscription= this.peopleService.peopleChanged.subscribe(
      (people: People[]) => {
      this.people = people;
    });
    this.people = this.peopleService.getPeople();
  }

  onNewPerson() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  isIncludedInSearch(person: People) {
    return this.searchText === '' ||
           (person.first_name + " " + person.last_name).toLowerCase().includes(this.searchText.toLowerCase())
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();    
  }

  getSearchedPeople() {
    const searchedPeople = this.people.filter((person: People) => {
                              return this.isIncludedInSearch(person);
                            })
    this.adjustPageIfNeeded(searchedPeople.length);
    return searchedPeople;
  }

  private adjustPageIfNeeded(currentPeopleCount: number) {
    if(this.page > (currentPeopleCount / this.pageSize)){
      this.page = Math.ceil(currentPeopleCount / this.pageSize) || 1;
    }
  }
}
