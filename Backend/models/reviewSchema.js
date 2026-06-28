const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        require:true
    },
    ItemsId:{
        type:mongoose.Types.ObjectId,
        ref:"product",
        require:true
    },
    Star:{
        type:Number,
        require:true,
        max:5,
        min:1
    },
    ReviewInText:{
        type:String,
    }
})

const review = mongoose.model("review",reviewSchema)

module.exports=review