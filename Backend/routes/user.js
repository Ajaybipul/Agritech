const express = require('express');
const router = express.Router();
// const UserModel = require('../models/Users');
const UserModel =require('../db/User/UserSchema')
// Change from:


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {    
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.json("Already registered");
        }

        const newUser = new UserModel({ username, email, password });     
        await newUser.save();
        res.json("Success");
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json("Server error");
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("Wrong password");
            }
        } else {
            res.json("No records found!");
        }
    } catch (err) {
        console.error('Error finding user:', err);
        res.status(500).json("Server error");
    }
});

module.exports = router;