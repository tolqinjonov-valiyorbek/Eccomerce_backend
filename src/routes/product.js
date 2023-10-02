const { createProduct, updateProduct, viewsProduct, deleteProduct, paginations,  search, viewProduct, filterByCategory } = require("../Controller/productController");

const router = require("express").Router();

router.post('/', createProduct);
router.put('/:id', updateProduct);


router.delete('/:id', deleteProduct);


router.get("/get-product", paginations)



router.get("/search", search);
router.get("/filter-by-category", filterByCategory);


router.get('/:id', viewProduct);
router.get('/', viewsProduct);

module.exports = router