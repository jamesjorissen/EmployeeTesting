const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var team = [];

async function mng() {
    let answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "number",
            name: "id",
            message: "What is your ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your phone number?",
        }
    ]);
    var employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    team.push(employee);
};

async function eng() {
    var answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "number",
            name: "id",
            message: "What is your ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
        {
            type: "input",
            name: "github",
            message: "What is your Github username?",
        }
    ]);
    var employee = new Engineer(answers.name, answers.id, answers.email, answers.github)
    team.push(employee);
};

async function int() {
    let answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "number",
            name: "id",
            message: "What is your ID?",
            default: 3
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
        },
        {
            type: "input",
            name: "school",
            message: "Where did you go to school?",
        }
    ]);
    var employee = new Intern(answers.name, answers.id, answers.email, answers.school)
    team.push(employee);
};

const gainMembership = async () => {
    let answers = await inquirer.prompt(
        {
            type: "list",
            name: "role",
            message: "What type of employee are you adding?",
            choices: ["Engineer", "Intern", "Manager"]
        }
    )
    if (answers.role === "Engineer") {
        await eng();
        addTeamMember();
    }
    else if (answers.role === "Intern") {
        await int();
        addTeamMember();
    }
    else if (answers.role === "Manager") {
        await mng();
        addTeamMember();
    }
}

//choice to add more profiles or not, if no the page will render as complete!
const addTeamMember = async () => {
    let answers = await inquirer.prompt(
        {
            type: "list",
            name: "role",
            message: "Would you like to add another",
            choices: ["Yes", "No"]
        }
    )
    if (answers.role === "Yes") {
        gainMembership();
    }
    else if (answers.role === "No") {
        complete();
    }
    else {
        console.log("complete")
    }
}

const assemble = async () => {
    await mng();
    gainMembership();
}

const complete = async () => {

    fs.writeFileSync(outputPath, render(team), "utf-8")
}

assemble();
