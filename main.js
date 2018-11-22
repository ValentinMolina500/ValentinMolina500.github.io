var person = {
    firstName: "John",
    lastName: "Smith",
    fullName () {
        return this.firstName + " " + this.lastName;
    }
}

console.log(person.fullName());

