// TODO: Write code to define and export the Employee class
// employee class used as template that will be extended to the other js files
class Employee {
  constructor(name, id, email) {
    this.name = name,
    this.id = id,
    this.email = email
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
    return 'Employee'
  }
}
// exporting so we can use this class anywhere
module.exports = Employee