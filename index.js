const inquirer = require('inquirer');
const fs = require("fs");
const util = require("util");

inquirer.prompt(
[{
  type: "input",
  name: "username",
  message: "What is your GitHub username?"
},
{
  type: "input",
  name: "projectName",
  message: "What is you project's name?"
},
{
  type: "input",
  name: "description",
  message: "Please write a short description of your project?"
},
{
  type: "input",
  name: "license",
  message: "What kind of project should your license have?"
},
{
  type: "input",
  name: "dependencies",
  message: "what command should be run to install dependencies?"
},
{
  type: "input",
  name: "testing",
  message: "What command should be run to run tests?"
},
{
  type: "input",
  name: "usingRepo",
  message: "What does the user need to know about using the repo?"
},
{
  type: "input",
  name: "contribution",
  message: "What does the user need to know about contributing to the repo?"
}]
  ).then(answer => {
    console.log(answer);
    const data = getData(answer);
    fs.writeFile("readme.html", datafunction(error){
      if(error) {
        return;
      }
      console.log("Success");
    });
  });
  
  function getData( {myName}) {
    return
  };

  // function writeToFile(filename,data) {

  // }

  // function init () {
  //   inquirer(questions).then(function(answers){
  //     console.log(answers);
  //   })
  // }