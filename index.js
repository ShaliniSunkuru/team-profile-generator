const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];


//Function that returns array of questions to be asked for employeeType.
const questions = employeeType => {
    
    //Function to validate input is entered
    const validateNotBlank = input => {
        return input ? true : 'Input cannot be blank!';
    }

    //Function to validate input is a number
    const validateNumber = input => {
        return !(input) || isNaN(input) ? 'Input needs to be a number!' : true;
    }

    const questionsArray = [];

    //question objects
    const nameQ = {
        type: 'input',
        name: 'name',
        message: `Please enter ${employeeType} name`,
        validate: validateNotBlank
    }
    const idQ = {
        type: 'input',
        name: 'id',
        message: 'Please enter Employee Id',
        validate: validateNotBlank
    }
    const emailQ = {
        type: 'input',
        name: 'email',
        message: 'Please enter email Id',
        validate: validateEmail = email =>{
            const regEmail = /\S+@\S+\.\S+/;
            return regEmail.test(email) ? true : 'Please enter email id in the foramt something@something.something';
        }
    }
    const officeNumQ = {
        type: 'input',
        name: 'officeNumber',
        message: 'What is your office number?',
        validate: validateNumber
    }
    const gitHubQ = {
        type: 'input',
        name: 'gitHub',
        message: 'Please enter github user name',
        validate: validateNotBlank
    }
    const schoolQ = {
        type: 'input',
        name: 'school',
        message: 'Please enter school',
        validate: validateNotBlank
    }

    //common questions for all employees
    questionsArray.push(nameQ, idQ, emailQ);

    //questions based on employeeType
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

//Function to display menu and handle selected choice from menu
const inquirerMenu = () =>{
    inquirer.prompt(menu())
        .then((choice) =>{        
                if(choice.menu === 'Add an engineer'){
                    inquirerEmployee('engineer');
                } else if(choice.menu === 'Add an intern'){
                    inquirerEmployee('intern');
                }else{
                    //Render HTML from page-template.js
                    const teamHTML = render(teamMembers);
                    //Write to html file
                    writeToFile(teamHTML);                    
                }                  
            })
}

//Function to prompt inquirer with questions to employeeType
const inquirerEmployee = employeeType => {
    switch(employeeType){
        case 'manager':
            inquirer.prompt(questions('manager'))
                .then((answers)=>{
                    const {name, id, email, officeNumber} = answers;
                    //create object of Manager class
                    const manager = new Manager(name, id, email, officeNumber);
                    //push created manager to teamMembers array
                    teamMembers.push(manager);
                    inquirerMenu();
                })
            break;
        case 'engineer':
            inquirer.prompt(questions('engineer'))
                .then((answers)=>{
                    const {name, id, email, gitHub} = answers;
                    //create object of Engineer class
                    const engineer = new Engineer(name, id, email, gitHub);
                    //push created engineer to teamMembers array
                    teamMembers.push(engineer);
                    inquirerMenu();
                })
            break;
        case 'intern':
            inquirer.prompt(questions('intern'))
                .then((answers)=>{
                    const {name, id, email, school} = answers;
                    //create object of Intern class
                    const intern = new Intern(name, id, email, school);
                    //push created intern to teamMembers array
                    teamMembers.push(intern);
                    inquirerMenu();
                })
            break;
    }
    
}

//Function to write to html file
const writeToFile = dataHTML => {
    fs.writeFile(outputPath,dataHTML,err =>{
        err?console.log(err):console.log('Success! Your team profile is saved to team.html file in the output folder.');
    })
}

inquirerEmployee('manager');
