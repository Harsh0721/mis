const jwt = require('jsonwebtoken');

function auth(req,res,next){

    const token = req.header('x-auth-token');
    console.log(token);
    if(!token)
    {
        res.status(401).send('Access denied. No token provided..');
        return;
    }    
    

    try{
        const decoded = jwt.verify(token,'mis_jwtPrivateKey');
        req.user = decoded;
        // set user as decoded version of this JWT
        // it have params like id,name etc.. whatever we passed
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token..');
    }
    

}

// this is middleware to verify JWT token. 

module.exports = auth;