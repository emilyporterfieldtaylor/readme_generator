const inquirer = require('inquirer');
const axios = require('axios');
const fs = require("fs");
const util = require("util");

inquirer.prompt([
  {
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
}

]).then(answer => {
    console.log(answer);

    const queryUrl = `https://api.github.com/users/${username}`
    const icon = "";
    axios.get(queryUrl).then(function(result){
      icon = result.data.avatar_url;

    })

    const data = getData(answer, icon);

    fs.writeFile("readme.md", data, function(error){
      if(error) {
        return;
      }
      console.log("Success");
    });
  });




  
  function getData(answer, icon) {
    return `# ${answer.projectName}
(https://github.com/${answer.username}/${answer.projectName})

## Description  
${answer.description}
    
## Table of Contents

  *[Installation](#installation)
  *[Usage](#usage)
  *[License](#license)
  *[Contribution](#contribution)
  *[Tests](#tests)
  *[Questions](#questions)
    
## Installation
${answer.dependencies}

To install necessary dependencies, run the following command:

--
npm i
--
    
## Usage
${answer.usingRepo}
    
## License
${answer.license}
    
## Contributing
${answer.contribution}
    
## Tests
${answer.testing}
    
## Questions

<img src="${icon}" alt="avatar" style="border-radius: 16px" width="30" />
​
If you have any questions about the repo, open an issue or contact ${answer.name}`
};

  // function writeToFile(filename,data) {

  // }

  // function init () {
  //   inquirer(questions).then(function(answers){
  //     console.log(answers);
  //   })
  // }