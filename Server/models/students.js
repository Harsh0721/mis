const { string, number } = require('joi');
const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://localhost/MIS');



const db = mongoose.connect( 'mongodb+srv://Harsh:%23Quadpro1234@cluster0.idzvx.mongodb.net/mis')
db.then( ()=> console.log("Connected to db..."))
.catch("Could not connecting to db....");


const student = new mongoose.Schema({

    coursesDetails:
        [
            {
            "courseName" : String,
            "grade" : Number
            }
        ]
    ,
    email: String
})


const studentModel = mongoose.model('Student', student)

module.exports = {
    studentModel: studentModel
}

