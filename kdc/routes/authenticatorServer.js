const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');
// const { authenticateToken, generateAccessToken } = require('../utils/authenticateToken');


const router = express.Router();

router.post("/signup", async (req, res)=> {
    const {
        username,
        password
    } = req.body;

    const email = req.body.email.toLowerCase();

    if(!username){
        return res.send({
            success: false,
            message: "Error: Username field cannot be empty"
        });
    }

    if(!email){
        return res.send({
            success: false,
            message: "Error: Email field cannot be empty"
        });
    }

    if(!password){
        return res.send({
            success: false,
            message: "Error: Password field cannot be empty"
        });
    }

    User.find({
        username: username
    }, (err, existingUser) => {
        if(err){
            console.log("first if");
            return res.send({
                success: false,
                message: "Error: Server Error"
            });
        } else if (existingUser.length > 0) {
            return res.send({
                success: false,
                message: "Error: User already exists"
            });
        }
        
        const newUser = new User();
        newUser.email = email;
        newUser.username = username;
        newUser.password = password;

        newUser.save((err, response) => {
            if(err){
                console.log("second if");
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                });
            };
            // console.log(response);
            return res.send({
                success: true,
                message: "User Sign up successfully"
            });
        });

    });
});

module.exports = router;
