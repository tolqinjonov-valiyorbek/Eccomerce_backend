const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // User modeliga ishora qilamiz
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Product modeliga ishora qilamiz
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      priceInSale:{
        type:Number,
        required:true
      }
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);