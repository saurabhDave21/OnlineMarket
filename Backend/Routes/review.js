const express = require("express")
const {isUserAuth} = require("../Middleware/userAuth")
const review = require("../models/reviewSchema")
const reviewRouter = express.Router()

reviewRouter.post("/review",isUserAuth,async(req,res)=>{
    try{
        const {ItemsId,Star,ReviewInText} = req.body
        const isExists =await review.findOne({
            $and:[
                {ItemsId},
                {userId:req.user._id}
            ]
        })
        if(Star == 0 || Star > 5){
            return res.status(400).json({message:"Star is Not vaild Must between 0 to 5"})
        }
        if(isExists){
            return res.status(400).json({message:"Per User and Items Only One Review"})
        }
        const reviewInstance = new review({
            userId:req.user._id,    
            ItemsId,
            Star,
            ReviewInText
        })
        const data = await reviewInstance.save()
        return res.status(200).json({message:"Review Submit",data})
    }
    catch(err){
        console.log(err)
    }
})

module.exports = reviewRouter