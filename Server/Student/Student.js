const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {studentModel} = require('../models/students');
const pug = require('pug');
const { stderr } = require('process');
const {courseModel} = require('../models/course');
const { find } = require('lodash');
const course = require('../models/course');


router.use( express.json() );

router.get('/',(req,res) => {
    res.send('Welcome to MIS for Student...');
});



// register for a new course
router.put('/courses', async(req,res) => {

  
    
    let course = {
        "courseName" : req.body.courseName,
        "grade" : 0
    }

    course.courseName = course.courseName.toLowerCase();
    course.courseName = course.courseName.trim();
    email = req.body.email;
    email = email.toLowerCase();

    updateCourse(email, req.body.courseName);
    // in reg students of courseName add email of current student.

    try{

         const done = await studentModel.updateOne(

            {"email": email},
            { $addToSet: { "coursesDetails": course } } ,
            {upsert: true} 
        
        )
        
        if(done.modifiedCount || done.upsertedCount)
        {
            res.send(JSON.stringify(done) );
            return;
        }
        else
        {
            res.status(409).send(JSON.stringify("Can't update, already exisit:") );
        }
        

    }
    catch(error){
        console.log('error while inserting course');
        res.status(400).send(JSON.stringify("Can't update, unknown error") );
    }
   

   
  
})

router.put('/grade', async (req,res) => {

    email = req.body.email;
    email = email.toLowerCase();
    email = email.trim();
    console.log(req.body);

    courseName = req.body.courseName
    grade = req.body.grade;
    NotDone = JSON.stringify("Error while grading");

    let course = {
        "courseName" : courseName,
        "grade" : grade
    } 
    
    try{

        let result = await studentModel.findOneAndUpdate(
            
             {
                 "email" : email,
                "coursesDetails.courseName" : courseName
             },
             {
                 $set : 
                 {
                     "coursesDetails.$.grade" : grade
                 }
             }
        )

    
        res.send(JSON.stringify("Graded") );
        return;

    }
    catch (err)
    {
        console.log(err.message);
        res.status(400).send(NotDone);
        return;
    }

    res.status(400).send(NotDone + 'asdsd');
})


router.get('/courses/available',async (req,res)=> {


    let result;

    try{

        result = await courseModel.find();
    }
    catch(err){
        console.log(err.message);
        res.status(400).send(JSON.stringify("Can't get courses") );
        return;
    }

    if(result)res.send(result);
    else res.status(400).send(JSON.stringify("Can't get courses") );



})

router.get('/courses/registered/:email', async(req,res) =>{


    console.log(req.params.email);
    let result;
    email = req.params.email;

    email = email.toLowerCase();


    try{

        result = await studentModel.findOne( {email: email} );
        
    }
    catch(err){
        
        console.log(err.message);
    }
  
    if(result){
        res.send(result.coursesDetails);
    }
    else res.status(400).send( JSON.stringify("Can't retrieve courses" ) );
})







async function updateCourse  (studentMail, courseName){

    studentMail = studentMail.toLowerCase();
    courseName = courseName.toLowerCase();
   

    try{

        const done = await courseModel.updateOne(

            {"courseName": courseName},
            { $addToSet: {"studentsEnrolled" : studentMail} },
            {upsert: true}
        )


        
    }
    catch(err){
        console.log(err.message);
    }


}


module.exports = router;