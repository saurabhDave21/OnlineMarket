const express = require("express");
const productRouter = express.Router();
const validator = require("validator");
const productsModel = require("../models/productSchema");
const store = require("../models/storeSchema");
const { isUserAuth, isUser, isSeller } = require("../Middleware/userAuth");

productRouter.post(
  "/store/add-product",
  isUserAuth,
  isSeller,
  async (req, res) => {
    try {
      if (req.body == undefined) {
        return res.status(400).json({ message: "Please Fill Form" });
      }
      const storeExists = await store.findOne({ ownerId: req.user._id });
      if (!storeExists) {
        return res.status(400).json({ message: "Store not exists" });
      }
      const storeId = storeExists._id
      if (storeExists.ownerId.toString() !== req.user._id.toString()) {
        return res.status(400).json({ message: "You can't access store" });
      }
      const product = req.body;
      if (!product.name || !product.description || !product.category) {
        return res.status(400).json({
          message: "Field is Required",
        });
      }
      if (product.price <= 0 || product.quantity < 0) {
        return res.status(400).json({
          message: "Price or quantity should be greater than 0",
        });
      }
      if (!validator.isURL(product.images)) {
        return res.status(400).json({
          message: "Enter a Valid Image URL",
        });
      }
      const productInstance = new productsModel({
        ...product,
        storeId,
      });
      const data = await productInstance.save();
      res.status(200).json({ message: "Product Successfully", data });
    } catch (err) {
      console.log(err);
    }
  },
);

productRouter.delete(
  "/store/delete-product/:productId",
  isUserAuth,
  isSeller,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const isProductExist = await productsModel
        .findOne({ $and: [{ _id: productId }, { isDeleted: false }] })
        .populate("storeId", "ownerId");
      if (
        isProductExist.storeId.ownerId.toString() !== req.user._id.toString()
      ) {
        return res.status(404).json({ message: "Invaild Access" });
      }
      if (!isProductExist) {
        return res.status(400).json({ message: "Products is Not Exists" });
      }
      isProductExist.isDeleted = true;
      const data = await isProductExist.save();
      res.status(200).json({ message: "Product Deleted Successfully", data });
    } catch (err) {
      console.log(err);
    }
  },
);

//for storeOwner fetchproducts
productRouter.get(
  "/store/seller/get-products",
  isUserAuth,
  isSeller,
  async (req, res) => {
    try {
      const fetchStore = await store.findOne({ ownerId: req.user._id });
      if (!fetchStore) {
        return res.status(404).json({ message: "unauthorized access" });
      }
      const products = await productsModel.find({
        $and: [{ storeId:fetchStore._id }, { isDeleted: false }],
      });
      res.status(200).json({ message: "Your Store Product", data: products });
    } catch (err) {
      console.log(err);
    }
  },
);

//for storeOwner updateProducts
productRouter.patch(
    "/store/update-product/:productId",
    isUserAuth,
    isSeller,
    async(req,res)=>{
        try{
            const {productId} = req.params
            const {name,description,price,category,quantity,images,isActive} = req.body
            const data  = await productsModel.findOneAndUpdate({_id:productId},{
                name,
                description,
                price,
                category,
                quantity,
                images,
                isActive
            })
            res.status(200).json({message:"Product Update Successfully"},data)
        }
        catch(err){
            console.log(err?.message)
        }
    }
)
//for user fetch all products
productRouter.get(
  "/store/get-product",
  isUserAuth,
  isUser,
  async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const basedOnPrice = req.query.price || null;
      const basedOnCategory = req.query.category || null;
      const basedOnSearch = req.query.search || null;
      const products = await productsModel
        .find({
            $and:[
                 { isDeleted: false },
                 { isActive: "Active" }
            ]
        })
        .skip(skip)
        .limit(limit);
      let updated = products;
      if (basedOnPrice) {
        updated =
          basedOnPrice == "htol"
            ? products.sort((a, b) => b.price - a.price)
            : basedOnPrice == "ltoh"
              ? products.sort((a, b) => a.price - b.price)
              : "";
      }
      updated = products.filter((elm) => {
        const categoryMatch =
          !basedOnCategory || elm.category === basedOnCategory;
        const searchMatch =
          !basedOnSearch ||
          elm.name.toLowerCase().includes(basedOnSearch.toLowerCase());

        return categoryMatch && searchMatch;
      });
      res
        .status(200)
        .json({ message: "All Product Fetch Successfully", data: updated });
    } catch (err) {
      console.log(err);
    }
  },
);

module.exports = productRouter;
