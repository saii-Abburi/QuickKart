const jwt = require('jsonwebtoken')

const authenticateUser = async function(req,res,next){
    
    const token =  req.headers.authorization?.split(" ")[1];
    if(!token){
        res.status(401).json({msg:'Authentication failed try to login agian'})
    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        // console.log(decoded);
        req.user = {
            id:decoded.userId,
            role:decoded.userRole
        }
        next();
    } catch (error) {
        res.status(401).json({msg:'invalid credentials'})
    }
}

module.exports = authenticateUser
