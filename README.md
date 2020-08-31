

# PackageExplorer

[Live demo](http://package-explorer.s3-website.eu-north-1.amazonaws.com/).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

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

## Application structure

- `data.service.ts` fetches the package information required. 
- In `package.service.ts` the package array is created and dependencies are converted to an array indicating if detailed dependency information is found from the data. Alternative dependencies and Reverse dependencies are also created here.  
- `package-list.html` lists all the packages while `package-details.html` displays details of each package. 
## Project features

On a Debian and Ubuntu systems, there is a file called /var/lib/dpkg/status that holds information about software packages that the system knows about. Write a small program in a programming language of your choice that exposes some key information about packages in the file via an HTML interface.

* The index page lists installed packages alphabetically with package names as links.
*When following each link, you arrive at a piece of information about a single package. The following information should be included:
* Name
* Description
* The names of the packages the current package depends on (skip version numbers)
* Reverse dependencies, i.e. the names of the packages that depend on the current package
* The dependencies and reverse dependencies should be clickable and the user can navigate the package structure by clicking from package to package. 

