const express = require("express");
const { isUserAuth, isSeller } = require("../Middleware/userAuth");
const order = require("../models/orderSchema");
const productModel = require("../models/productSchema");
const store = require("../models/storeSchema");
const DashRouter = express.Router();
const review = require("../models/reviewSchema");
DashRouter.get("/dashboard", isUserAuth, isSeller, async (req, res) => {
  try {
    const storeData = await store.findOne({ ownerId: req.user._id });
    if (!storeData) {
      return res.status(400).json({ message: "Store not found" });
    }
    const totalOrder = await order.find({}).populate({
      path: "items.ItemsId",
      select: "storeId",
      match: {
        storeId: storeData._id,
      },
    });
    let NumberOfOrder = 0;
    let totalRevenue = 0;
    let itemIds = [];
    let mostRepeatedOrder = {};
    const filteredOrders = await Promise.all(
      totalOrder.map(async (e) => {
        return (
          await Promise.all(
            e.items.map(async (itemsData) => {
              if (itemsData.ItemsId) {
                NumberOfOrder++;
                totalRevenue += itemsData.price;
                itemIds.push(itemsData.ItemsId._id);
                const id = itemsData.ItemsId._id.toHexString();
                mostRepeatedOrder[id] = (mostRepeatedOrder[id] || 0) + 1;
                return itemsData;
              }

              return null;
            }),
          )
        ).filter(Boolean);
      }),
    );
    const result = filteredOrders.map((e) => {
      return e
        .map((elm) => {
          for (const id in mostRepeatedOrder) {
            if (id === elm.ItemsId._id.toString()) {
              return elm;
            }
          }
          return null;
        })
        .filter(Boolean);
    });
    const reviews = await review.find({
      ItemsId: { $in: itemIds },
    });
    const averageRating = reviews.length
      ? reviews.reduce((sum, review) => sum + review.Star, 0) / reviews.length
      : 0;
    return res.status(200).json({
      message: "Your Response",
      data: { result, NumberOfOrder, totalRevenue, averageRating },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = DashRouter;
