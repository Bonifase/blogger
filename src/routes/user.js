const express = require('express');
const User = require('../models/user');
const validateRequest = require("../utilities/validateRequest")
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// get all users route (http://localhost:9000/users
router.get('/', (req, res) => {
    User.find()
    .then(users => res.json({"users": users}))
    .catch(err => console.log("The following errors occured" + err));
});
// Sign up route (http://localhost:9000/users/signup)
router.post("/signup", async (req, res) => {
    const data = validateRequest(req.body);
    if(!data){
        res.json({message:"Please provide all the fields"})
    }
    bcrypt.hash(data.password, 10, (err, hash) => {
        data.password = hash;
        let newUser = new User(data)
        newUser.save()
        .then(() => res.json({message: "Signup was successful!"}))
        .catch(err => console.log("The following errors occured" + err));
        });   
});

// login route (http://localhost:9000/users/login)
router.post("/login", async (req, res) => {
    const data = validateRequest(req.body);
    if(!data){
        res.json({message:"Please provide all the fields"})
    }
    User.findOne({email:data.email}).then(user => {
        if(!user){
            res.status(401).json({message: "Failed to authorize"})
        }
        bcrypt.compare(data.password, user.password).then(result => {
            // result == true
            if(result){
                let token = jwt.sign({
                    email: user.email,
                    userId: user._id,
                    username: user.username 
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }

                )
                res.status(201).json({
                    token: token, 
                    email: user.email,
                    userId: user._id,
                    username: user.username 
                })
            }
            res.status(401).json({message: "Failed to authorize"})
        });
    }).catch()
    
});
module.exports = router;
