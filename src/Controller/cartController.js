const Product = require("../models/Product");
const Cart = require("../models/Cart");
const User = require("../models/User");

const addToCart = async (req, res) => {
  const { productId, quantity, price, priceInSale } = req.body;
  const userId = req.user._id

  try {
    // Foydalanuvchi uchun savatcha obyektini olish
    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      // Foydalanuvchi savatchasi yo'q bo'lsa, yangi savatcha yaratish
      userCart = new Cart({ userId, items: [] });
    }

    // Mahsulotni topish
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ message: `Berilgan ID ga mos mahsulot topilmadi!` });
    }

    if (quantity > product.quantity - product.sold) {
      return res.status(400).json({ message: `Mahsulot soni ${quantity} ta emas` });
    }

    if (price !== product.price) {
      return res.status(400).json({ message: `Berilgan narx ushbu mahsulotga tegishli emas` });
    }
    if (priceInSale !== product.priceInSale) {
      return res.status(400).json({ message: `Berilgan chegirmanarx ushbu mahsulotga tegishli emas` });
    }

    // Yangi mahsulotni qo'shish
    const newCartItem = {
      productId,
      userId,
      quantity,
      price, 
      priceInSale
    };

    userCart.items.push(newCartItem);

    // Savatchani saqlash
    await userCart.save();

    // Foydalanuvchini yangilash
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { cart: userCart }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: `Savatchada qo'shishda xatolik` });
    }

    res.status(201).json({ message: "Savatchaga muvaffaqiyatli qo'shildi!", userCart });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ichki server xatosi yuz berdi. Iltimos keyinroq urinib ko'ring!",
    });
  }
};


const getUserCart = async (req, res) => {
  try {
    const productsInTheCart = await User.findById(req.user._id);

    if (!productsInTheCart.cart) {
      return res.status(200).json({ message: "Mahsulotlar savatchasi bo'sh" });
    }

    res
      .status(200)
      .json({ message: "Savatchadagi mahsulotlar", productsInTheCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Nimadir xato ketdi. Iltimos keyinroq qayta urinib ko'ring!",
    });
  }
};

const deleteCart = async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;

  try {
    // Cart itemni o'chirish
    const deleteFromToCart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });

    if (!deleteFromToCart) {
      return res.status(400).json({ message: "ID bo'yicha savatcha topilmadi" });
    }

    // Userdan cartni ham o'chirish
    await User.findByIdAndUpdate(_id, { cart: null });

    return res
      .status(200)
      .json({ message: "Muafaqaiyatli o'chirildi", deleteFromToCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Nimadir xatolik ketdi. Iltimos keyinroq yana urinib ko'ring",
    });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  deleteCart,
};
