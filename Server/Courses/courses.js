const express = require('express');
const router = express.Router();
const {courseModel} = require('../models/course');

router.use( express.json() );


router.get('/:course', async(req,res) => {


    course = req.params.course;
    course = course.toLowerCase();
    course = course.trim();

    let result;

    try{
            result = await courseModel.findOne( {courseName: course} );
    }
    catch(err)
    {
            console.log(err.message);
            res.status(400).send( JSON.stringify("Can't retrieve") );
            return 
    }

    if(result)
    {
        res.send(result);
    }
    else res.status(400).send( JSON.stringify("Can't retrieve") );

})

module.exports = router;