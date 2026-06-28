const express = require("express")  
const validator = require('validator');
const userRouter = express.Router()
const bcrypt = require("bcrypt") 
const user = require("../models/userSchema")
const {isUserAuth} = require("../Middleware/userAuth")
const jwt = require("jsonwebtoken")

userRouter.post("/signup",async(req,res)=>{
    if(req.body == undefined){
        return res.status(400).json({message:"Please Fill Input"})
    }
    const {email,name,password,type}=req.body
    try{
    if(!validator.isEmail(email)){
        return res.status(400).send("Email is not Vaild")
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).send("Password Must be Strong")
    }
    if(!["user","seller"].includes(type)){
        return res.status(400).send("Types is not Vaild")
    }
    const isEmailExists =await user.findOne({email})
    if(isEmailExists){
        return res.status(400).json({message:"Email Alredy Exists",data:email})
    }
    const hashPassword =await bcrypt.hash(password, 10)
    const userInfo = new user({
        name,
        email,
        password:hashPassword,
        type,
    })
    const data = await userInfo.save()
    res.status(201).json({message:`${data.type} Register Successfully`,data})
    }
    catch(err){
        console.log(err?.message)
    }
})
userRouter.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body
        const userData = await user.findOne({email})
        if(!userData){
            return res.status(404).json({message:"Email not exists"})
        }
        const PasswordVaild = await bcrypt.compare(password,userData.password)
        if(!PasswordVaild){
            return res.status(404).json({message:"Password is not Vaild"})
        }
        const token = jwt.sign(userData._id.toString(),process.env.JWT_SECRET)
        res.cookie("token",token)
        const data = {
            name:userData.name,
            type:userData.type,
            token
        }
        res.status(200).json({message:"Login Successfully",data})
    }
    catch(err){
        console.log(err)
    }
})
userRouter.get("/profile",isUserAuth,(req,res)=>{
    const data = {
        name:req.user.name,
        type:req.user.type,
        token:req.cookies.token
    }
    return res.status(200).json({message:"Profile fetch",data})
})
userRouter.get("/logout",async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"Logout Done"})
})
module.exports = userRouter