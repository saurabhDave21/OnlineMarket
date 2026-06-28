const mongoose = require("mongoose")

const cartSchema  = mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        require:true,
    },
    items:[{
        ItemsId:{
            type:String,
            require:true
        },
        name:{
            type:String,
            require:true
        },
        description:{
            type:String,
        },
        price:{
            type:Number,
            require:true
        },
        category:{
            type:String,
            require:true
        },
        Itemsquantity:{
            type:Number,
            require:true        
        },
        images:{
            type:String,
            require:true
        }
    }]
})

const cart = mongoose.model("cart",cartSchema)

module.exports = cart