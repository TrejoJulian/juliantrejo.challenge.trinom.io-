import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import {NgxPaginationModule} from 'ngx-pagination'
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PeopleDetailComponent } from './people/people-detail/people-detail.component';
import { PeopleEditComponent } from './people/people-edit/people-edit.component';
import { PeopleStartComponent } from './people/people-start/people-start.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PersonItemComponent } from './people/people-list/person-item/person-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PeopleListComponent,
    PeopleDetailComponent,
    PeopleEditComponent,
    PeopleStartComponent,
    HeaderComponent,
    NotFoundComponent,
    DropdownDirective,
    PersonItemComponent,
    CourseListComponent,
    CourseItemComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
