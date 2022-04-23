const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {userModel} = require('../models/user');
const pug = require('pug');
const {teacherModel} = require('../models/teachers');
const {courseModel} = require('../models/course');

router.use( express.json() );

router.get('/', (req,res) => {
    res.send('Welcome to MIS For Teacher...');
});


done = "done";
// add course to <courses> array for this teacher
// in <taught by> -> courses add, this teacher name

router.put('/courses', async(req,res) => {

    

    let course = {
        "courseName" : req.body.courseName,
        "courseRating" : 0,
        "studentsEnrolled": 0
    }
    course.courseName = course.courseName.toLowerCase();
    course.courseName = course.courseName.trim();

    updateCourse(req.body.teacherName, req.body.courseName);

    try{

         const done = await teacherModel.updateOne(

            {"email": req.body.email},
            { $addToSet: { "courses": course }} ,
            {upsert: true} 
        
        )
        
        if(done.modifiedCount || done.upsertedCount)
        {
            res.send(JSON.stringify(done) );
            return;
        }
        else 
        {
            res.status(409).send(JSON.stringify("Already exists") );
            return;
        }

    }
    catch(error){
        console.log('error while inserting course');
    }
   

     res.status(400).send("Can't update");
  
})




router.get('/courses/:email', async (req,res)=> {

    let Teacher;
    console.log(req.params);

    let email = (String) (req.params.email) ;
    email = email.toLowerCase();
    
    try{

       Teacher = await teacherModel.findOne( {email: email} );
    }
    catch{
        console.log("error while retrieving courses");
    }

    if(Teacher){
        res.send(Teacher.courses);
    }
    else{
        res.status(400).send('Cant retireve courses' );
    }




})



async function updateCourse  (teacherName, courseName){

    teacherName = teacherName.toUpperCase();
    courseName = courseName.toLowerCase();

    try{

        const done = await courseModel.updateOne(

            {"courseName": courseName},
            { $addToSet: {"taughtBy" : teacherName} },
            {upsert: true}
        )
    }
    catch(err){

    }


}

module.exports = router;