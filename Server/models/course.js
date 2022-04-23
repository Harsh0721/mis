const { string, number } = require('joi');
const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://localhost/MIS');


const db = mongoose.connect( 'mongodb+srv://Harsh:%23Quadpro1234@cluster0.idzvx.mongodb.net/mis')
db.then("Connected to db...")
.catch("Can't connect to db [course model] ");

const course = new mongoose.Schema({

    courseName: String,
    taughtBy : [String],
    studentsEnrolled: [String]
});


const courseModel = mongoose.model('course', course );

module.exports = {

    courseModel : courseModel
}

