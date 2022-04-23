const { string, number } = require('joi');
const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://localhost/MIS');



const db = mongoose.connect( 'mongodb+srv://Harsh:%23Quadpro1234@cluster0.idzvx.mongodb.net/mis')

db.then( ()=> console.log("Connected to db..."))
.catch("Could not connecting to db....");


const teacher = new mongoose.Schema({

    courses : {
        "courseName" : String,
        "courseRating" : Number,
        "studentsEnrolled": Number   
    },
    email: String

})


const teacherModel = mongoose.model('Teacher', teacher)

module.exports = {
    teacherModel: teacherModel
}

