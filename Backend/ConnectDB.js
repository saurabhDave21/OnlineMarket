const mongoose = require("mongoose")


const connectDB = async() =>{
    try{
        const res = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("Database Connected")
    }
    catch(err){
        console.log(err)
    }
}

module.exports =  connectDB