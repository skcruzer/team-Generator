// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// variable to refer to employee.js template
const Employee = require('./Employee.js')

class Engineer extends Employee {
  constructor(name, id, email, github) {
    // using super to bring in from employee.js template
    super(name, id, email)
    this.github = github
  }
  getName() {
    return this.name
  }
  getId() {
    return this.id
  }
  getEmail() {
    return this.email
  }
  getRole() {
    return 'Engineer'
  }
  getGithub() {
    return this.github
  }
}

module.exports = Engineer