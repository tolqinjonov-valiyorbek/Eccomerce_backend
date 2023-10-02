const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    Specifications: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceInSale: {
      type: Number,
      required: true,
    },
    adminBonus: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      home: { type: String },
      photo1: { type: String },
      photo2: { type: String },
      photo3: { type: String },
      photo4: { type: String },
      photo5: { type: String },
    },
    videos: {
      type: String,
    },
    tags: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      default: 2,
    },
  },
  { timestamps: true }
); 

//Export the model
module.exports = mongoose.model("Product", productSchema);
