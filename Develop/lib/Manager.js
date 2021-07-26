const Employee = require("./Employee");

class Manager extends Employee {

    constructor(name, id, email, officePhone) {
        super(name, id, email);
        this.officePhone = officePhone;
    }

    getRole() {
        return "Manager";
    }

    getOfficePhone() {
        return this.officePhone;
    }

}

module.exports = Manager;