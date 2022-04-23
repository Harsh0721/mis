const express = require('express');
const router = express.Router();


router.use( express.json() );

router.get('/', (req,res) => {
    
    res.sendFile(__dirname + '/welcome.html');
});


module.exports = router;