# 1. Front-end Platform: Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# 2. Back-end Platform: Firebase
This Angular project is deployed to Firebase, which provides Internet access to the web application. 
Run `firebase init` to initialize the project for firebase deploying. Run `firebase deploy` to upload the compiled files of the project (`\dist` directory in this project) and deploy the project on Firebase servers. 

# 3. Dependencies
| Packages                         | Version |
| ----                             | ---- |
|@angular-devkit/architect         |0.901.7|
|@angular-devkit/build-angular     |0.901.7|
|@angular-devkit/build-optimizer   |0.901.7|
|@angular-devkit/build-webpack     |0.901.7|
|@angular-devkit/core              |9.1.7|
|@angular-devkit/schematics        |9.1.7|
|@angular/cdk                      |9.2.4|
|@angular/cli                      |9.1.7|
|@angular/fire                     |6.0.0|
|@angular/material                 |9.2.4|
|@ngtools/webpack                  |9.1.7|
|@schematics/angular               |9.1.7|
|@schematics/update                |0.901.7|
|rxjs                              |6.5.5|
|typescript                        |3.8.3|
|webpack                           |4.42.0|

# 4. Code structures of this project
## Configure files
The files in the root directory are mainly configuration files, for instance the `.json` `.rules` `.js` files. 
## Compiled files
The `/dist` directory contains the compiled files of this project, running `ng build` command would generate this directory. 
## Source code files
The `/src` directory contains all the source code files we wrote for this project. The web application has three modules: authentication module `/src/app/auth`, student portal module `/src/app/student` and teacher portal module `/src/app/teacher`. 