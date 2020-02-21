const inquirer = require('inquirer');
const axios = require('axios');
const fs = require("fs");

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
  type: "list",
  name: "license",
  message: "What kind of project should your license have?",
  choices: ["Creative Commons","Apache", "BSD"]
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

    let queryUrl = `https://api.github.com/users/${answer.username}`
    axios.get(queryUrl).then(function(result){
    let icon = result.data.avatar_url;
    let htmlUrl = result.data.html_url;
    let badge = "";

    if (answer.license === "Creative Commons"){
      badge = `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by/4.0/)`
    } else if (answer.license === "Apache"){
      badge = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
    } else {
      badge = `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
    }
      
    let data = getData(answer, badge, icon, htmlUrl);
      
      fs.writeFile("readme.md", data, function(error){
        if(error) {
          return;
        }
        console.log("Success");
      });
    })
  });




  
  function getData(answer, badge, icon, htmlUrl) {
    return `# ${answer.projectName}
(https://github.com/${answer.username}/${answer.projectName})

## Description  
${answer.description}
<br>
${badge}
    
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
${badge}
    
## Contributing
${answer.contribution}
    
## Tests
${answer.testing}
    
## Questions

<img src="${icon}" alt="avatar" style="border-radius: 16px" width="30" />
​
If you have any questions about the repo, open an issue or contact ${htmlUrl}`
};

  // function writeToFile(filename,data) {

  // }

  // function init () {
  //   inquirer(questions).then(function(answers){
  //     console.log(answers);
  //   })
  // }