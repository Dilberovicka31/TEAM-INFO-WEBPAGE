const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");

const employeesEl = [];

//Get manager data
function managerQuestions() {
  return inquirer
    .prompt([
      {
        message: " What is your manager's name?",
        name: "name",
        type: "input",
      },
      {
        message: "What is your manager's id?",
        name: "id",
        type: "input",
      },
      {
        message: "What is your manager's email?",
        name: "email",
        type: "input",
      },
      {
        message: " What is your manager's office number",
        name: "officeNumber",
        type: "input",
      },
    ])
    .then((managerInfo) => {
      const managerNew = new Manager(
        managerInfo.name,
        managerInfo.id,
        managerInfo.email,
        managerInfo.officeNumber
      );
      employeesEl.push(managerNew);

      employeeType();
    });
}

//After initial manager data ask the user what employee would like to add next, added conditional to render questions depending on user answer
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
    .then((response) => {
      console.log(response);
      if (response.type === "Engineer") {
        engineerQuestions();
      } else if (response.type === "Intern") {
        internQuestions();
      } else {
        renderHtml();
      }
    });
}

//Questions to get engineer info
function engineerQuestions() {
  return inquirer
    .prompt([
      {
        message: " What is your engineer's name?",
        name: "name",
        type: "input",
      },
      {
        message: "What is your engineer's id?",
        name: "id",
        type: "input",
      },
      {
        message: "What is your engineer's email?",
        name: "email",
        type: "input",
      },
      {
        message: " What is your engineer's GitHub username?",
        name: "github",
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
      employeesEl.push(newEngineer);

      employeeType();
    });
}

//Questions to get intern info
function internQuestions() {
  return inquirer
    .prompt([
      {
        message: " What is your intern's name?",
        name: "name",
        type: "input",
      },
      {
        message: "What is your intern's id?",
        name: "id",
        type: "input",
      },
      {
        message: "What is your intern's email?",
        name: "email",
        type: "input",
      },
      {
        message: "What  is your intern's school?",
        name: "school",
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
      employeesEl.push(internNew);

      employeeType();
    });
}
managerQuestions();

//Create HTML file into new output folder/team.html
function renderHtml() {
  const contentHtml = render(employeesEl);
  fs.writeFileSync("team.html", contentHtml);
}
