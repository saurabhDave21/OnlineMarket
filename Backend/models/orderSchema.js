const mongoose = require("mongoose")
const user = require("../models/userSchema")
const products = require("../models/productSchema")
const orderSchema = mongoose.Schema({
    userId:{
    type:mongoose.Types.ObjectId,
    ref:"user",
    require:true,
    },
    items:[{
        ItemsId:{
            type:String,
            ref:"products",
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
        },
        orderStatus:{
        type:String,
        enum:[ "Placed", "Shipped", "Delivered", "Cancelled"],
        default:"Placed"
    }
    }],
    totalPrice:{
        type:Number,
        require:true,
    },
    quantity:{
        type:Number,
        require:true,
    },
    orderDate:{
        type:String,
        require:true
    }
})

const orders = mongoose.model("orders",orderSchema)

module.exports = orders