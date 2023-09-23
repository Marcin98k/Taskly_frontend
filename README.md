## Note: 
### There was a failure with the nested repository, so the frontend part may contain some deficiencies. I'll try to fix it in the next few days.

# Taskly(Frontend)
## Description

Taskly is a task management application that assists in planning and organizing tasks. Its main features include:

- **Task Planning and Management:** Tasks can be set according to priority, category, status, and duration (from -> to, from -> forever).

- **Registration and Login:** The application requires an account setup, to which tasks are assigned. Spring Security has been utilized for login, registration, and authorization.

## Usage
The application is under development. More information on usage will be provided soon.

## Requirements
The following tools and technologies are needed to run and develop this project:

- **Visual Studio Code:** The IDE used for writing and testing code.
- **Angular:** A framework for building web applications.
- **Material UI:** A UI component library for easier user interface design.
- **HTML/CSS:** Languages for creating and styling web pages.
- **TypeScript:** A programming language used for writing client-side scripts.

## Dependencies
The application uses the following dependencies:

- @angular/core: ^16.2.2
- @angular/router: ^16.2.2
- @types/angular: ^1.8.5
- moment: ^2.29.4
- @fortawesome/free-solid-svg-icons: An icon library used in the project.

## Before you start
Before running the application, you must have installed:
 - [Node.js](https://nodejs.org/en),
 - Angular CLI (PowerShell)
```npm install -g @angular/cli```

Then you need to add some modules:
Open the PowerShell terminal in your IDE where the project is located and navigate to the main application folder:
Example(Visual Studio Code):
![Module](https://github.com/Marcin98k/Taskly_frontend/assets/126909195/68a9ae7c-9322-481b-8666-7f5929ae458c)

Add modules responsible for:
 - Appearance:
 ```
 npm install --save @angular/material
 npm install --save bootstrap
 ```

 - Icons:
 ```
 npm install --save @fortawesome/free-solid-svg-icons
 npm install --save @fortawesome/angular-fontawesome
 ```

 - Date and time handling:
 ```
 npm install --save moment
 npm install --save @angular/material-moment-adapter
 ```
## Contact
If you have any questions/suggestions about this project, please [contact me](marcin3009k@gmail.com).
