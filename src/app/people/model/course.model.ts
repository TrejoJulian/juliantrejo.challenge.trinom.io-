import { Language } from "./language.model";
import { Level } from "./level.model";

export class Course {
    id: number;
    name: string;
    language_code: string;
    level_id: number;
    created_at: string;
    updated_at: string; // new Date().toLocaleString().replaceAll('/','-').replace(',','')
    pivot?: {people_id: number, course_id: number} //Ver despues que hacer con el pivot)
    level: Level;
    language: Language;

    constructor(id: number, name: string, language_code: string, level_id: number, created_at: string,
                updated_at: string,level: Level, language: Language,
                pivot?: {people_id: number, course_id: number}){
        this.id = id;
        this.name = name;
        this.language_code = language_code;
        this.level_id = level_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.pivot = pivot;
        this.level = level;
        this.language = language;
    }
}