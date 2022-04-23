const { boolean } = require('joi');
const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://localhost/MIS');

const db = mongoose.connect( 'mongodb+srv://Harsh:%23Quadpro1234@cluster0.idzvx.mongodb.net/mis')

db.then( ()=> console.log("Connected to db..."))
.catch("Could not connecting to db....");


const announcement = mongoose.Schema( {

    initial: String,
    isAdmin: Boolean,
    email: String,

    replies: 
    [ 
        
        {
            "isAdmin" : Boolean,
            "reply" : String,
            "email" : String
        }  
    ]

})

const announcementModel = mongoose.model('announcement', announcement);

module.exports = {
    announcementModel : announcementModel
}