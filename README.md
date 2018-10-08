# Epicodus Development Environment Template

## Description

Use this template repo for starting new projects while at Epicodus. Update with new technologies and packages as needed. Versions for all packages are pinned according to the version number specified in the Epicodus curriculum.

## Installation Instructions

* Clone this repo.
* Copy all files from root directory except folder .git and this readme file to a new, empty project folder.
* In terminal, navigate to your project folder run the following:
```
$ git init
$ npm install
```
* At Epicodus, you can build and start the webpack dev server with the command
```
$ npm run start
```
* (this message is just for me...) At home, on your Windows machine, you need to build first, then start the dev server
```
$ npm run build
$ webpack-dev-server --open --mode development
```
* To open karma, run command
```
$ npm test
```
