const mongoose = require("mongoose")
const user = require("./userSchema")

const storeSchema = mongoose.Schema({
    storename:{
        type:String,
        require:true,
        min:3,
    },
    description:{
        type:String,
        require:true
    },
    contact:{
        type:Number,
        require:true
    },
    ownerId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        require:true
    },
})

const store = mongoose.model("Store",storeSchema)

module.exports = store