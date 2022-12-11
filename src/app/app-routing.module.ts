import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PeopleComponent } from "./people/people.component";
import { PeopleDetailComponent } from "./people/people-detail/people-detail.component";
import { PeopleEditComponent } from "./people/people-edit/people-edit.component";
import { PeopleStartComponent } from "./people/people-start/people-start.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { CourseListComponent } from "./course-list/course-list.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/people', pathMatch: 'full'},
    {path: 'people', component: PeopleComponent, children: [
        {path: '', component: PeopleStartComponent},
        {path: 'new', component: PeopleEditComponent},
        {path: ':id', component: PeopleDetailComponent},
        {path: ':id/edit', component: PeopleEditComponent}
    ]},
    {path: 'courses', component: CourseListComponent},
    {path: 'not-found', component:NotFoundComponent},
    {path: '**', redirectTo:'/not-found'}
    

];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}