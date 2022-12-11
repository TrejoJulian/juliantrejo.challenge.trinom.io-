import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Course } from "../people/model/course.model";

@Injectable({
    providedIn: "root"
})
export class CourseService {
    url = 'http://jtrejo.challenge.trinom.io/api/courses';

    constructor(private http: HttpClient) {}

    fetchCourses() {
        return this.http.get<Course[]>(this.url)
    }
}