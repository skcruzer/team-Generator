const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { finished } = require("stream");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// employee array; new employees will be pushed into this array 
let employeeArray = []

const finished = () => {
  // calling the render function and passing it in an array
  let myTeamHtml = render(employeeArray)
}

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
    if (yesOrNo.yesOrNo === 'yes') {
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
    if(answer.engOrInt === 'Engineer') {
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
          message: 'What does/did the intern attend?'
        } 
      ])
      .then(intern => {
        console.log(intern)
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
