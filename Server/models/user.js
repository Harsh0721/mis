const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');
const { boolean } = require('joi');
// const db = mongoose.connect('mongodb://localhost/MIS');



const db = mongoose.connect( 'mongodb+srv://Harsh:%23Quadpro1234@cluster0.idzvx.mongodb.net/mis')

db.then( ()=> console.log("Connected to db..."))
.catch("Could not connecting to db....");


const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 256,
        unique: true
    },
    
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },

    isAdmin : Boolean
});

const user = mongoose.model('Users', userSchema);


function validateUser(user)
{
    const schema = Joi.object( {
        userName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(10).max(256).required(),
        password: Joi.string().min(5).max(1024).required()
    });

    

    return schema.validate( {
        userName: user.userName,
        email: user.email,
        password : user.password
    });
}



module.exports =  {

    validate : validateUser,
    userModel: user,
}