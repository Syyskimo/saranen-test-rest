'use strict';

const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = new express();
const bodyParser = require('body-parser');
dotenv.config();


// register JSON parser middlewear
app.use(bodyParser.json());

require('./routes/personRoutes')(app);

let PORT = process.env.PORT || 3000;

app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
  
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
});

app.get("/user/validateToken", (req, res) => {
	// Tokens are generally passed in the header of the request
	// Due to security reasons.

	let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
	let jwtSecretKey = process.env.JWT_SECRET_KEY;

	try {
		const token = req.header(tokenHeaderKey);

		const verified = jwt.verify(token, jwtSecretKey);
		if(verified){
			return res.send("Successfully Verified");
		}else{
			// Access Denied
			return res.status(401).send(error);
		}
	} catch (error) {
		// Access Denied
		return res.status(401).send(error);
	}
});


app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});