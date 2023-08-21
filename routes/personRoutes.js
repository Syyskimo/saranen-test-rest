'use strict';

const Router = require('express');
const personRepo = require('../repo/personRepository');
const jwt = require('jsonwebtoken');


const getPersonRoutes = (app) => {
    const router = new Router();

    router
        .get('/get/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const result = personRepo.getById(id);
            res.send(result);
        })
        .get('/all', (req, res) => {
            const result = personRepo.getAll();
            res.send(result);
        })
        .get('/remove', (req, res) => {
            personRepo.remove();
            const result = 'Last person remove. Total count: '
                + personRepo.persons.size;
            res.send(result);
        })
        .post('/save', (req, res) => {
            const person = req.body;
            let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
            let jwtSecretKey = process.env.JWT_SECRET_KEY;

            try {
                const token = req.header(tokenHeaderKey);
        
                const verified = jwt.verify(token, jwtSecretKey);
                if(verified){
                    console.log("Verified");
                    console.log(verified);
                    if (verified.id == person.id) {
                        return es.send(personRepo.save(person));
                    } else {
                        return res.status(401).send("You naughty bastard! You cannot change _other_ people data!");
                    }

                }else{
                    // Access Denied
                    return res.status(401).send(error);
                }
            } catch (error) {
                // Access Denied
                return res.status(401).send(error);
            }


            //const result = personRepo.save(person);
            //res.send(result);
        })
        .post('/login', (req, res) => {
            const input = req.body;

            let user = personRepo.login(input.email, input.password);
            if (!user) {
                return res.status(401).send("Bad user! go home!");
            } else {
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign({firstname: user.firstName, lastname: user.lastName, id: user.id}, jwtSecretKey);
                res.send(token);
            }
        });

    app.use('/person', router);
};

module.exports = getPersonRoutes;