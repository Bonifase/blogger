const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        var verified = jwt.verify(
            token, 
            process.env.JWT_KEY
            );
        req.user = verified;
        next();
    }catch(errror){
        return res.status(401).json({message: "Unauthorized"})
    }
    
}
