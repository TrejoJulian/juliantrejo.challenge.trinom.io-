import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {  map, Subject } from "rxjs";
import { People } from "../people/model/people.model"
import { PeopleResponse } from "./people-response";

@Injectable({
    providedIn: "root"
})
export class PeopleService {
    
    peopleChanged = new Subject<People[]>();
    peopleLoaded: People[] = [];
    url = 'http://jtrejo.challenge.trinom.io/api/people';

    constructor(private http: HttpClient, private router: Router) {
        this.fetchPeople();
    }

    fetchPeople() {
        this.http.get<PeopleResponse>(this.url)
            .pipe(map(responseData => {
                return responseData.data;
            }))
            .subscribe(people => {
                this.peopleLoaded = people;
                this.peopleChanged.next(this.peopleLoaded);
            });
    }

    getPeople() {
        return this.peopleLoaded.slice();
    }

    getPerson(id: number){
        return this.http.get<People>(this.url + "/" + id);
    }

    addPerson(person: People) {
        return this.http.post(this.url, person);
      }
    updatePerson(id: number, person: People) {
        const putUrl = this.url + "/" + id;
        return this.http.put(putUrl, person);
    }

    deletePerson(id: number) {
        const deleteUrl = this.url + "/" + id;
        this.http.delete(deleteUrl).subscribe((_) => this.fetchPeople());
    }

}