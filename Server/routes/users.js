const {userModel,validate} = require('../models/user');
const express = require('express');
const { countReset } = require('console');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.use( express.json() );

router.get('/', (req,res) => {
    res.send('Welcome user...');
});


router.post('/',  async(req,res) => {

    const {result,error} = validate(req.body);

    if(error){
        res.status(400).send(error.message);
        return;
    }

    let User = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    } );


    let isDuplicate = await userModel.findOne( {email: req.body.email} );
  
    
    if(isDuplicate){
        res.status(400).send("Email-id already registered..");
        return;
    }

    try{

        const salt = await bcrypt.genSalt(10);
        User.password = await bcrypt.hash(User.password, salt);
    }
    catch(err){
        console.log(err);
    }



    try{

        await User.save();
        console.log("User saved...");
    }
    catch(err){
        console.log(err);
        console.log("Can't save user...");
    }

    const token = jwt.sign( {id: User.id, name: User.userName}, 'mis_jwtPrivateKey');
    // we send JWT token as soon as someone registers in response header

    res.header('x-auth-token',token).send( `user ${User} saved...`);



});

module.exports = router;