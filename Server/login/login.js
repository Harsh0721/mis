const express = require('express');
const router = express.Router();
const pug = require("pug");
const Joi = require("joi");
const {userModel} = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.use( express.json() );


router.get('/', (req,res) => {
    // res.sendFile(__dirname + '/login.html');
    res.send("hello world");
});

router.post('/',  async(req,res) => {

    
    email = req.body.email.toLowerCase();

    console.log(req.body);
    let User 
    try{
            User = await userModel.findOne( {email: email}) ;
            // User = await userModel.find();
    } 
    catch(err){
        console.log(err.message);
    }

    // console.log(req.body)
    

    if(!User){
        console.log("User not found");
        res.send('User Not Found');
        return;
    }
    
    let validPass;
    
    try{
        validPass = (req.body.password == User.password);
    }
    catch(err){
        console.log(err.message);
    }

    

    if(!validPass){
        console.log("User or pass don't match.");
        res.status(400).send('User or pass dont match...');
        return;
    }

    try{
        const token = jwt.sign(

            {
                id: User.id, 
                isAdmin: User.isAdmin,
                email: User.email,
                userName : User.userName
            },

            'mis_jwtPrivateKey',
            
            {
                expiresIn: "2h"
            });
        // send a JWT upong login.
        // we sh store it in env var, by config module
        // do that
        console.log("done");
        console.log(token);
        res.send(JSON.stringify(token));       
        // res.redirect('/homeStudent');
    }
    catch(err){
        console.log(err);
    }

    

    


});


function validateNameEmail(req){

    const schema = Joi.object( {
        userName: Joi.string().min(5).max(256).required(),
        password: Joi.string().min(5).max(1024).required()
    });

    

    return schema.validate( {
        password: req.password,
        userName: req.userName
    });


}

module.exports = router;