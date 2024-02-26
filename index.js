const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

//Function that returns array of questions to be asked for employeeType.
const questions = employeeType => {
    const questionsArray = [];
    const nameQ = {
        type: 'input',
        name: 'name',
        message: `Please enter ${employeeType} name`
    }
    const idQ = {
        type: 'input',
        name: 'id',
        message: 'Please enter Employee Id'
    }
    const emailQ = {
        type: 'input',
        name: 'email',
        message: 'Please enter email Id'
    }
    const officeNumQ = {
        type: 'input',
        name: 'officeNumber',
        message: 'What is your office number?'
    }
    const gitHubQ = {
        type: 'input',
        name: 'gitHub',
        message: 'Please enter github user name'
    }
    const schoolQ = {
        type: 'input',
        name: 'school',
        message: 'Please enter school'
    }
    questionsArray.push(nameQ, idQ, emailQ);
    switch(employeeType){
        case 'manager':
            questionsArray.push(officeNumQ);
            break;
        case 'engineer':
            questionsArray.push(gitHubQ);
            break;
        case 'intern':
            questionsArray.push(schoolQ);
            break;    
    }
    return questionsArray;

} 

// console.log(questions("engineer"));

//Function that returns menu for inquirer prompt
const menu = () =>{
    return [
        {
            type: 'list',
            name: 'menu',
            message: 'Choose an option:',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
        }
    ]
}

//prompt inquirer with questions to manager
//create manager object with answers
//prompt inquirer menu
//repeat for choice of intern, engineer
//call page-template to write to file