const user = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const isUserAuth = async (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        res.status(400).json({message:"Token is not present"})
    }
    const isVaildToken = jwt.verify(token,process.env.JWT_SECRET)
    if(!isVaildToken){
        res.status(400).json({message:"Error invaild token"})
    }
    const userData = await user.findById({_id:isVaildToken})
    if(!userData){
        res.status(400).json({message:"user is not found"})
    }
    req.user = userData
    next()
}
const isSeller = (req,res,next)=>{
    if(req.user.type=="user"){
        return res.status(400).json({message:"Only seller can do this"})
    }
    next()
}
const isUser = (req,res,next)=>{
     if(req.user.type=="seller"){
        return res.status(400).json({message:"Only user can do this"})
    }
    next()
}
module.exports = {
    isUserAuth,
    isSeller,
    isUser,
};