const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// employee array; new employees will be pushed into this array 
let employeeArray = []

// function for user to add more team members or not
const contQuest = () => {
  inquirer.prompt ([{
    type: 'list',
    name: 'yesOrNo',
    message: 'Do you want to add more team members?',
    choices: ['Yes', 'No']
  }])
  .then(yesOrNo => {
    // go back to engineerOrIntern call
    if (yesOrNo.yesOrNo === 'Yes') {
      engineerOrIntern() 
    } else {
      finished()
    }
  })
}

// function to add either engineer or intern
const engineerOrIntern = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'engOrInt',
      message: 'Do you want to add an engineer or an intern?',
      choices: ['Engineer', 'Intern']
    }
  ])
  .then(answer => {
    console.log(answer)
    if (answer.engOrInt === 'Engineer') {
      // questions if adding an engineer to the team
      inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the engineer?'
        },
        {
          type: 'input',
          name: 'id',
          message: 'What is the id of the engineer?'
        },
        {
          type: 'input',
          name: 'email',
          message: 'What is the email address of the engineer?'
        },
        {
          type: 'input',
          name: 'github',
          message: 'What is the github username of the engineer?'
        } 
      ])
      .then(engineer => {
        console.log(engineer)
        let newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
        // logs the engineer in the array with the other members
        employeeArray.push(newEngineer)
        console.log(employeeArray)
        contQuest()
      })
    } else if (answer.engOrInt === 'Intern') {
      // questions if adding an intern to team
      inquirer.prompt ([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the intern?'
        },
        {
          type: 'input',
          name: 'id',
          message: 'What is the id of the intern?'
        },
        {
          type: 'input',
          name: 'email',
          message: 'What is the email address of the intern?'
        },
        {
          type: 'input',
          name: 'school',
          message: 'What school does the intern attend?'
        } 
      ])
      .then(intern => {
        let newIntern = new Intern(intern.name, intern.id, intern.email, intern.school)
        employeeArray.push(newIntern)
        console.log(employeeArray)
        contQuest()
      })
    }
  })
}

// using inquirer to get information about the team members
inquirer.prompt ([
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the team manager?'
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is the id of the team manager?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is the email address of the team manager?'
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: 'What is the office number of the team manager?'
  }
])
.then(manager => {
  console.log(manager)
  let newManager = new Manager(manager.name, manager.id, manager.email, manager.officeNumber)
  // will log manager information as an array
  employeeArray.push(newManager)
  console.log(employeeArray)
  engineerOrIntern()
})

// function to input user data into html generating team page
function finished() {
  // Create the output directory if the output path doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(employeeArray), 'utf-8');
}
