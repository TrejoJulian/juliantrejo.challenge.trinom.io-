# trinom.io Challenge


## Technologies Used:
- Angular 15
- Node v16.16.0
- Bootstrap 3 to allow compatibility with older navigators.
- rxjs library to use observables and its functions.
- ngx-pagination library for pagination.

## Prerequisites:
1. Have Angular Cli installed.
2. Have Node installed.

## How to run:
1. Clone the repository or download the tag and unzip it.
2. Open a terminal in the root of the project and run npm install.
3. On the same terminal, run ng serve. The application should start running in port 4200. You can acccess it by going to http://localhost:4200/. 

## Goal
This web application's aim is to provide the user with the ability to manage people and their courses: 
- The user can visualize everyone check their details, and edit them if required. 
- Courses can be added and removed from the people listed.
- Delete functionality was also added. 
- The course list is also available in the courses section that can be found in the navbar. </ul>
This application was made to be responsive to work both in computer screens as well as cellphones. 

## How to use:

The home page is the people list. Click on someone to view his or her details. You can also edit or detele said person by pressing the Manage Person button, or simply add someone new via the Add New button. Regarding the edit or registration form, here are the requirements for every field:
- first name: It cannot be empty, can not contain only whitespaces and it can contain up to 30 characters.
- last name: It cannot be empty, can not contain only whitespaces and it can contain up to 30 characters.
- email: it must be a valid email and it can contain up to 254 characters.
- course name: For example English 1, English 2, English 3. You can check all courses in the Courses section.

