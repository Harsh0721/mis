const {userModel} = require('../models/user');
const express = require('express');
const { countReset } = require('console');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

router.use( express.json() );

router.get('/', (req,res) => {
    res.send('Welcome user...');
});


router.post('/',  async(req,res) => {

    
    const {result,error} = validateNameEmail(req.body);

    
    if(error){
        res.send('Invalid credentials');
        return;
    }

    let User = await userModel.findOne( {email: req.body.email}) ;

    if(!User){
        res.send('Invalid credentials');
        return;
    }

    let validPass;

    try{
        validPass = await bcrypt.compare(req.body.password, User.password)
    }
    catch(err){
        console.log(err.message);
    }

    

    if(!validPass){
        res.send('Invalid credentials...');
        return;
    }

    try{
        const token = jwt.sign({id: User.id}, 'mis_jwtPrivateKey');
        // send a JWT upong login.
        // we sh store it in env var, by config module
        // do that

        res.send(`Login succesfully... ${token} `);
    }
    catch{
        console.log(err);
    }

    


});


function validateNameEmail(req){

    const schema = Joi.object( {
        email: Joi.string().min(10).max(256).required(),
        password: Joi.string().min(5).max(1024).required()
    });

    

    return schema.validate( {
        password: req.password,
        email: req.email
    });


}

module.exports = router;