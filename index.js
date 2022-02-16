//DEPENDENCIES
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = require('./db/connection');

//MAIN MENU
function menu() {
  inquirer
      .prompt({
          name: "selection",
          type: "list",
          message: "What would you like to do?",
          choices: [
              "View All Employees",
              "View All Employees by Department",
              "View All Departments",
              "View All Roles",
              "Add Employee",
              "Add Department",
              "Add Role",
              "Remove Employee",
              "Update Employee Role",
              "Exit Application"
          ]
      })
      //Choices
      .then(function (answer) {
          switch (answer.selection) {
              case "View All Employees":
                  viewEmployees();
                  break;
              case "View All Employees by Department":
                  viewEmployeesByDepartment();
                  break;
              case "View All Departments":
                  viewDepartments();
                  break;
              case "View All Roles":
                  viewRoles();
                  break;
              case "Add Employee":
                  addEmployee();
                  break;
              case "Add Department":
                  addDepartment();
                  break;
              case "Add Role":
                  addRole();
                  break;
              case "Remove Employee":
                  removeEmployee();
                  break;
              case "Update Employee Role":
                  updateEmployeeRole();
                  break;
              case "Exit Application":
                  db.end();
                  break;
          }
      });
}

function viewEmployees() {
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
  db.query(query, function (err, res) {
    console.table(res);
    menu();
  });
}

function viewDepartments() {
  var query = "SELECT * FROM department"
  db.query(query, function (err, res) {
    console.table(res);
    menu();
  });
}

function viewRoles() {
  var query = "SELECT * FROM role"
  db.query(query, function (err, res) {
    console.table(res);
    menu();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "lastName"
      },
      {
        type: "input",
        message: "Enter the employee's role ID",
        name: "addEmployRole"
      },
      {
        type: "input",
        message: "Enter the employee's manager ID",
        name: "addEmployMan"
      }
    ])
    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const employRoleID = res.addEmployRole;
      const employManID = res.addEmployMan;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}", "${employManID}")`;
      db.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        menu();
      });
    });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the name of the new department",
      name: "newDept"
    })
    .then(function (res) {
      const newDepartment = res.newDept;
      const query = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;
      db.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        menu();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's title",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "Enter the employee's salary",
        name: "roleSalary"
      },
      {
        type: "input",
        message: "Enter the employee's department ID",
        name: "roleDept"
      }
    ])
    .then(function (res) {
      const title = res.roleTitle;
      const salary = res.roleSalary;
      const departmentID = res.roleDept;
      const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
      db.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        menu();
      });
    });
}

function updateEmployeeRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's ID you want to be updated",
        name: "updateEmploy"
      },
      {
        type: "input",
        message: "Enter the new role ID for that employee",
        name: "newRole"
      }
    ])
    .then(function (res) {
        const updateEmploy = res.updateEmploy;
        const newRole = res.newRole;
        const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
        db.query(queryUpdate, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          menu();
        })
      });
    }

menu();