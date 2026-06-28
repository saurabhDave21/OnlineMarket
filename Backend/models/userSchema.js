const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:3,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        min:8,
    },
    type:{
        type:String,
        enum:["user","seller"],
        default:"user"
    }
})

const user = mongoose.model("user",userSchema)

module.exports = user