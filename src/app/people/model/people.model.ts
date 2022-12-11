import { Course } from "./course.model";

export class People {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
    courses: Course[];

    constructor(id: number, first_name: string, last_name: string, email: string,
                created_at: string, updated_at: string, courses: Course[]) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.courses = courses;
    }
}