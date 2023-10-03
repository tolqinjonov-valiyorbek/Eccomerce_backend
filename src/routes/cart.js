const router = require("express").Router()
const { authMiddleware } = require("../Middleware/authMiddleware")
const { addToCart, getUserCart, deleteCart } = require("../Controller/cartController")

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getUserCart);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, deleteCart);

module.exports = router