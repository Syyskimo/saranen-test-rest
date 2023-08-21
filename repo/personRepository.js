'use strict';

const Person = require('../json/person');

class PersonRepository {
    constructor() {
        this.persons = new Map([
            [1, new Person(1, 'John', 'Snow', 'john@snow.com', 'password1')],
            [2, new Person(2, 'Irma', 'Lightfoot', 'light@foot.com', 'test')],
            [3, new Person(3, 'Queen', 'Elisabeth', 'queen@uk', 'peasant')],
            [4, new Person(4, 'Super', 'Man', 'super@man.com', 'clarkkent')]
        ]);
    }

    getById(id) {
        return this.persons.get(id);
    }

    getAll() {
        return Array.from(this.persons.values());
    }

    remove() {
        const keys = Array.from(this.persons.keys());
        this.persons.delete(keys[keys.length - 1]);
    }

    save(person) {
        if (this.getById(person.id) !== undefined) {
            this.persons[person.id] = person;
            return "Updated Person with id=" + person.id;
        }
        else {
            this.persons.set(person.id, person);
            return "Added Person with id=" + person.id;
        }
    }

    login(email, password) {
        let match = null;
        for (var user of this.persons.values()) {
            if (user.email == email && user.checkPassword(password)) {
                match = user;
                break;
            }
        }
        return match;
    }
}

const personRepository = new PersonRepository();

module.exports = personRepository;