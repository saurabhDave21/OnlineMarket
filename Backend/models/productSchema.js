const mongoose = require("mongoose")
const store = require("../models/storeSchema")
const productSchema = mongoose.Schema({
    storeId:{
        type:mongoose.Types.ObjectId,
        ref:"Store",
        require:true,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:String,
        enum:["Active","Deactive"],
        default:"Active"
    },
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true,
    },
    quantity:{
        type:Number,
        require:true
    },
    images:{
        type:String,
        require:true
    }
})

const products = mongoose.model("products",productSchema)

module.exports = products