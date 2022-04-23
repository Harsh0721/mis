const express = require('express');
const { any } = require('joi');
const { result, initial } = require('lodash');
const router = express.Router();
const {announcementModel} = require('../models/announcements');
const { studentModel } = require('../models/students');
var ObjectId = require('mongodb').ObjectId; 
router.use( express.json() );


router.get('/' , async(req,res) => {

    
    let result;

    try{

         result = await announcementModel.find();
         console.log(result);
    }
    catch(err){
        console.log(err.message);
    }

    
    if(result){
        res.send(result);
    }
    else {

        res.send( JSON.stringify("No Announcements yet" ) );
    }
     

    
})

router.get('/:id' , async(req,res) => {

    
    let result;

    try{

         result = await announcementModel.findById(req.params.id);
         console.log(result);
    }
    catch(err){
        console.log(err.message);
    }

    
    if(result){
        res.send(result);
    }
    else {

        res.send( JSON.stringify("No Announcements yet" ) );
    }
     

    
})

router.post('/new', (req,res) => {

     
    console.log(req.body);
    let isAdmin = req.body.isAdmin;
    let initial = req.body.announcement;
    initial = initial.toLowerCase();
    let email = req.body.email;
    email = email.toLowerCase();
    email = email.trim();

    let announcement = {

        "initial" : initial,
        "isAdmin" : isAdmin, 
        "email" : email,
        "replies":  []
    }

    try{

        let  result = announcementModel.insertMany(announcement);

        if(result){
            res.send( JSON.stringify("announced succesfully" ) );
            return;
        }

    }
    catch(err){
        console.log(err.message);
    }

    res.send(JSON.stringify("can't make annoucnement"));
     

})


router.put('/reply', async(req,res) => {

    console.log(req.body);

    let reply = {
        "isAdmin" : req.body.isAdmin,
        "reply" : req.body.reply,
        "email" : req.body.email
    }

    reply.email = reply.email.toLowerCase();
    reply.email = reply.email.trim();

    try{

        const result = await announcementModel.findByIdAndUpdate(

            {"_id" : ObjectId( req.body.id ) },
            { $push : {"replies" : reply} },
            {new: true}
        )

        console.log(result);
        res.send(JSON.stringify("replied succesfully") );
        return;

    }
    catch(err){
        console.log(err.message);
    }

    res.status(400).send(JSON.stringify("Cant reply now") );

})

module.exports = router;