const express = require("express");
const validator = require("validator");
const store = require("../models/storeSchema");
const {isUserAuth,isUser,isSeller} = require("../Middleware/userAuth")
const storeRouter = express.Router();

storeRouter.post("/create-store",isUserAuth,isSeller, async (req, res) => {
  try {
    if (req.body == undefined) {
      return res.status(400).json({ message: "Please Fill Form" });
    }
    const { storename, description, contact } = req.body;
    const ownerId = req.user._id;
    if (
      storename == "" ||
      description == "" ||
      contact == ""
    ) {
      return res.status(400).json({ message: "Every Field is Require" });
    }
    const storeInstance = new store({
      storename,
      description,
      contact,
      ownerId,
    });
    const data = await storeInstance.save();
    res.status(200).json({ message: "Store is Created", data });
  } catch (err) {
    console.log(err);
  }
});

storeRouter.post("/delete-store/:storeId",isSeller,async(req,res)=>{
  try{

  }
  catch(err){

  }
})




module.exports = storeRouter;
