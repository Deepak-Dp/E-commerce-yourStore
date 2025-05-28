const jwt = require('jsonwebtoken')
require('dotenv').config()


const auth = async (req, res, next) => {
    try {

        const token = req.cookies.Accesstoken || req.headers["x-access-token"];
           

           if(!token){
            return res.status(401).json({
                message: "Please Login first"
            })
           }

           const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ) 
           console.log(decode);
            if(!decode) {
                return res.status(400).json({
                    message: 'unauthorized access',
                    error: true,
                    success: false
                })
            } 
            
            req.userId = decode.userId;
            next()
           
    } catch (error) {
        return res.status(501).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = auth;