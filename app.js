const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function managerQuestions() {
  return inquirer
    .prompt([
      {
        message: " What is your manager's name?",
        name: "type",
        type: "input",
        // choices: ["Manager", "Engineer", "Intern"],
      },
      {
        message: "What is your manager's id?",
        name: "type",
        type: "input",
      },
      {
        message: "What is your manager's email?",
        name: "type",
        type: "input",
      },
      {
        message: " What is your manager's office number",
        name: "type",
        type: "input",
      },
    ])
    .then((managerInfo) => {
      const managerNew = new Manager(
        managerInfo.name,
        managerInfo.id,
        managerInfo.email,
        managerInfo.office
      );
      console.log(managerNew);
      employeeType();
    });
}
managerQuestions();

function employeeType() {
  return inquirer
    .prompt([
      {
        message: " Which type of team member would you like to add?",
        name: "type",
        type: "list",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members",
        ],
      },
    ])
    .then((employeeInput) => {
      if (employeeInput === "Engineer") {
        console.log(employeeInput);
        engineerQuestions();
      } else {
        employeeInput === "Intern";
        console.log(employeeInput);
        internQuestions();
      }

      //Switch case depending on what was picked, create questions, another inquirer
    });
}

function engineerQuestions() {
  return inquirer
    .prompt([
      {
        message: " What is your engineer's name?",
        name: "type",
        type: "input",
      },
      {
        message: "What is your engineer's id?",
        name: "type",
        type: "input",
      },
      {
        message: "What is your engineer's email?",
        name: "type",
        type: "input",
      },
      {
        message: " What is your engineer's GitHub username?",
        name: "type",
        type: "input",
      },
    ])
    .then((engineerInfo) => {
      const newEngineer = new Engineer(
        engineerInfo.name,
        engineerInfo.id,
        engineerInfo.email,
        engineerInfo.github
      );

      console.log(engineerInfo);
    });
}

function internQuestions() {
  return inquirer
    .prompt([
      {
        message: " What is your intern's name?",
        name: "type",
        type: "input",
      },
      {
        message: "What is your intern's id?",
        name: "type",
        type: "input",
      },
      {
        message: "What is your intern's email?",
        name: "type",
        type: "input",
      },
      {
        message: "What  is your intern's school?",
        name: "type",
        type: "input",
      },
    ])
    .then((internInfo) => {
      const internNew = new Intern(
        internInfo.name,
        internInfo.id,
        internInfo.email,
        internInfo.school
      );

      console.log(internInfo);
    });
}

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
