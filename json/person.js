'use strict';
const crypto =  require('node:crypto');


const SALT = 'thereoncewasmannamedAFDG)¤#"JGDSÖIJG';

class Person {
    constructor(id, firstName, lastName, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        //this.password = password;
        this.password = crypto.createHash('sha256').update(password + SALT).digest('hex');
    }

    checkPassword(password) {
        return this.password == crypto.createHash('sha256').update(password + SALT).digest('hex');
        //return this.password == password;
    }
}

module.exports = Person;