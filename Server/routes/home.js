const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {userModel} = require('../models/user');
const pug = require('pug');


router.use( express.json() );

router.get('/',auth, (req,res) => {
    res.send('Welcome to MIS...');
});



// router.get('/me', auth, async (req,res) => {

//     try{
//         const User = await userModel.findOne({id: req.user.id} ).select('-password');
//         res.send(User);
//     }
//     catch(err){
//         console.log(err.message);
//     }

  
// });


module.exports = router;