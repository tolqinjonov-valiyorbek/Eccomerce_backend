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
    category: [
      {
        type:String,
      enum: [
        "Telefonlar",
        "Sovg'alar",
        "Aksessurlar",
        "Kremlar",
        "Elektronika",
        "Quloqchinlar",
        "Noutbooklar",
        "Navigatorlar",
        "Audiotexnika",
        "Tashqi akumlyatorlar",
        "Smartfonlar",
        "Knopkali telefonlar",
        "Maishiy texnika",
        "Oshxona buyumlari",
        "Uy uchun texnika",
        "Iqlim texnikasi",
        "Sport kiyimlar",
        "Oyoq kiyimlar",
        "Ustki kiyim",
        "Chaqaloq uchun kiyimlar",
        "Maxsus kiyimlar",
        "Yuz parvarishi",
        "Tana parvarishi",
        "Makiyak",
        "Soch parvarishi",
        "Ko'z oynaklar",
        "Fleshkalar",
        "Kompyuter texnikasi",
        "Antiradarlar",
        "Rullar",
        "Shifobaxsh suvlar",
        "Magnitafonlar",
        "Massaj uskunalar",
        "Salomatlik",
        "Aqlli o'yinchoqlar",
        "Yumshoq o'yinchoqlar",
        "Diniy adabiyotlar",
        "Badiiy adabiyotlar",
        "Biznes",
        "Bolajonlar uchun",
        "Taqinchoqlar",
      ],
      required: [true, "category is required"],
    }],
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
