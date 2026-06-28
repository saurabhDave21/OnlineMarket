const express = require("express");
const productModel = require("../models/productSchema");
const cart = require("../models/cartSchema");
const { isUserAuth, isUser, isSeller } = require("../Middleware/userAuth");
const cartRouter = express.Router();

cartRouter.post(
  "/cart/add-items/:itemsId",
  isUserAuth,
  isUser,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { itemsId } = req.params;
      const itemsExists = await productModel.findOne({
        $and: [{ _id: itemsId }, { isActive: "Active" }, { isDeleted: false }],
      });
      
      if (!itemsExists) {
        return res.status(400).json({ message: "Items Not Found!" });
      }
      const isItemsCountIncrease = await cart.findOne({ userId });
      //   let TotalBill=isItemsCountIncrease.items.map((e)=>{return e.price*e.Itemsquantity}).reduce((acc,val)=>acc+val,0)
      if(itemsExists.quantity == 0){
          return res.status(400).json({message:"Seller don't have product"})
      }
      let data;
      if (isItemsCountIncrease) {
        const itemsData = isItemsCountIncrease.items.find(
          (e) => e.ItemsId == itemsId,
        );
        if (itemsData == undefined) {
          const arr = [
            ...isItemsCountIncrease.items,
            {
              ItemsId: itemsExists._id,
              name: itemsExists.name,
              description: itemsExists.description,
              price: itemsExists.price,
              category: itemsExists.category,
              Itemsquantity: 1,
              images: itemsExists.images,
            },
          ];
          isItemsCountIncrease.items = arr;
          const data = await isItemsCountIncrease.save();
          return res
            .status(200)
            .json({ message: "You added items successfully", data });
        }
        itemsData.Itemsquantity = itemsData.Itemsquantity + 1;
        itemsData.price = itemsExists.price * itemsData.Itemsquantity;
        console.log(itemsData);
        data = await isItemsCountIncrease.save();
        return res
          .status(200)
          .json({ message: "Here Increase", data: isItemsCountIncrease });
      }

      const itemsInstance = new cart({
        userId: req.user._id,
        items: [
          {
            ItemsId: itemsExists._id,
            name: itemsExists.name,
            description: itemsExists.description,
            price: itemsExists.price,
            category: itemsExists.category,
            Itemsquantity: 1,
            images: itemsExists.images,
          },
        ],
      });
      data = await itemsInstance.save();

      res.status(200).json({ message: "Your Products Found", data });
    } catch (err) {
      console.log(err);
    }
  },
);

cartRouter.delete(
  "/cart/delete-items/:itemsId",
  isUserAuth,
  isUser,
  async (req, res) => {
    try {
      const { itemsId } = req.params;
      const itemsData = await cart.findOne({userId:req.user._id})
      const deleteItems = await itemsData.items.filter((elm)=>elm.ItemsId !== itemsId)
      itemsData.items = deleteItems
      const data = await itemsData.save()
      res
        .status(200)
        .json({ message: "Items Deleted Successfully", data });
    } catch (err) {
      console.log(err);
    }
  },
);

module.exports = cartRouter;
