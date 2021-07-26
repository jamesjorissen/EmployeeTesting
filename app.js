const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputCourse = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function applicationList() {
    function userQuestions() {
        return inquirer.prompt([
            {
                type: "list",
                name: "employeeTitle",
                message: "Employee Title: ",
                choices: ["Engineer", "Intern", "Manager"]
            },
            {
                type: 'input',
                name: 'name',
                message: 'Please tell me your name:'
            },
            {
                type: 'input',
                name: 'id',
                message: 'Please tell me your id number:'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Please tell me your email address:'
            },
            {
                type: "input",
                name: "github",
                message: "Please tell me your Github username: ",
                when: function (answers) {
                    const value = answers.employeeTitle == "Engineer" ? true : false;
                    return value;
                }
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Please tell me your office number: ",
                when: function (answers) {
                    const value = answers.employeeTitle == "Manager" ? true : false;
                    return value;
                }
            },
            {
                type: "input",
                name: "school",
                message: "Please tell me which school you attended: ",
                when: function (answers) {
                    const value = answers.employeeTitle == "Intern" ? true : false;
                    return value;
                }
            }
        ]);
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputCourse, render(answers), "utf-8");
    }

    userQuestions();
}

applicationList();
