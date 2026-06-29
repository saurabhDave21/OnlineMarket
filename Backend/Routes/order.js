const express = require("express");
const { isUserAuth, isUser, isSeller } = require("../Middleware/userAuth");
const cart = require("../models/cartSchema");
const order = require("../models/orderSchema");
const productModel = require("../models/productSchema");
const store = require("../models/storeSchema");
const orderRouter = express.Router();

orderRouter.post("/order", isUserAuth, isUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const userCart = await cart.findOne({ userId });
    if (!userCart) {
      return res.status(400).json({ message: "Can't Empty Cart Chekout" });
    }
    const totalPrice = userCart.items.reduce((acc, val) => acc + val.price, 0);
    const todayDate = new Date().toLocaleDateString();

    const orderInstance = new order({
      userId,
      items: userCart.items,
      totalPrice,
      quantity: userCart.items.length,
      orderDate: todayDate,
    });
    const data = await orderInstance.save();
    orderInstance.items.map(async (e) => {
      const itemsData = await productModel.findOne({ _id: e.ItemsId });
      itemsData.quantity = itemsData.quantity - e.Itemsquantity;
      await itemsData.save();
    });
    const cartisEmpty = await cart.findOneAndDelete({ userId });
    return res
      .status(200)
      .json({ message: "Order Successfully ", data: orderInstance });
  } catch (err) {
    console.log(err);
  }
});

orderRouter.get("/order",isUserAuth,async(req,res)=>{
  try{
    if(req.user.type == "user"){
      const AllOrder = await order.find({userId:req.user._id})
      if(!AllOrder){
        return res.status(400).json({message:"No Order Exists"})
      }
      return res.status(200).json({message:"Here is Your Orders",data:AllOrder})
    }
    else{
      const FindOrderForSeller = await store.find({ownerId:req.user._id})
      const findOrder = await order.find({}).populate({
      path: "items.ItemsId",
      select: "storeId",
      match: {
        storeId: FindOrderForSeller[0]._id,
      },
      });
      const orderForSeller = findOrder.map((e)=>{
        const order = e.items.filter((elm)=>elm.ItemsId)
        return order
      })
      if(!findOrder){
        return res.status(400).json({message:"No Order Found"})
      }
      return res.status(200).json({message:"Seller Order",data:orderForSeller})
    }
  }
  catch(err){
    console.log(err)
  }
})

orderRouter.patch("/order", isUserAuth, isSeller, async (req, res) => {
  try {
    const { status, orderId, ItemsId } = req.body;
    if (!["Placed", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Update is not vaild" });
    }
    const isOrder = await order.findOne({ _id: orderId });
    if (!isOrder) {
      return res.status(400).json({ message: "No Order Exists" });
    }
    const productData = await productModel
      .findOne({ _id: ItemsId })
      .populate("storeId", "ownerId");
    if (productData.storeId.ownerId.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Unauthorized Access" });
    }
    const isOrderUpdated = isOrder.items.find(
      (e) => e.ItemsId == ItemsId,
    );
    if (!isOrderUpdated) {
    return res.status(400).json({ message: "Item not found" });
    }
    isOrderUpdated.orderStatus = status
    const data = await isOrder.save()
    return res
      .status(200)
      .json({ message: "Order is Founded", data });
  } catch (err) {
    console.log(err);
  }
});
module.exports = orderRouter;
