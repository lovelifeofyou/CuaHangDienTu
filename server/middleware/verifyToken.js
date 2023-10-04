const jwt = require('jsonwebtoken');

const asyncHandler  = require('express-async-handler');

const verifyAccessToken = asyncHandler(async(req,res,next)=>{
    if(req?.headers?.authorization?.startsWith('Bearer')){
        //Bearer chuỗi token
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err) return res.status(401).json({
                success : false,
                mes :'Invalid access token'
            })
            console.log(decode);
            req.user = decode;
            next();
        })
    }
    else{
        return res.status(401).json({
            success : false,
            mes : 'Require authorization !!!'
        })
    }
})

const isAdmin = asyncHandler((req,res,next)=>{
    const {role} = req.user;
    if(role !== 'admin')
    return res.status(401).json({
        success: false,
        mes : 'require admin role'
    })
    next();
})
module.exports = {
    verifyAccessToken,
    isAdmin
}