require("dotenv").config()
const express = require("express")
const connectDB = require("./ConnectDB")
const userRouter = require("./Routes/signup")
const cookieParser = require("cookie-parser")
const storeRouter = require("./Routes/store")
const productRouter = require("./Routes/Products")
const cartRouter = require("./Routes/cart")
const orderRouter = require("./Routes/order")
const reviewRouter = require("./Routes/review")
const cors = require("cors")
const DashRouter = require("./Routes/Performance")
const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/",userRouter)
app.use("/",storeRouter)
app.use("/",productRouter)
app.use("/",cartRouter)
app.use("/",orderRouter)
app.use("/",reviewRouter)
app.use("/",DashRouter)
connectDB()
.then((value)=>{
    app.listen(process.env.PORT,(req,res)=>{
    console.log("Server Started")
    })
})
.catch((err)=>console.log(err))
