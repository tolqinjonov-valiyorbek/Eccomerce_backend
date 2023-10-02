const Product = require("../models/Product");
const Fuse = require("fuse.js");
const { transliterateCyrillicToLatin } = require("../utils/extra");

const createProduct = async (req, res) => {
  const {
    name,
    description,
    Specifications,
    price,
    priceInSale,
    adminBonus,
    category,
    quantity,
    sold,
    images,
    videos,
    rating,
    tags
  } = req.body;
  try {
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: `Bu "${name}"  allaqachon mavjud!` });
    }

    const newProduct = new Product({
      name,
      description,
      Specifications,
      price,
      priceInSale,
      adminBonus,
      category,
      quantity,
      sold,
      images,
      videos,
      rating,
      tags
    });
    const createdProduct = await newProduct.save();
    res.status(201).json({
      message: "Mahsulot muvaffaqiyatli qo'shildi!",
      product: createdProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
       name,
      description,
      Specifications,
      price,
      priceInSale,
      adminBonus,
      category,
      quantity,
      sold,
      images,
      videos,
      rating,
      tags
  } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
     {  
      name,
      description,
      Specifications,
      price,
      priceInSale,
      adminBonus,
      category,
      quantity,
      sold,
      images,
      videos,
      rating,
      tags
    },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Muafaqiyatli o'zgartirildi", updatedProduct });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Nimadir xato ketdi. Iltimos keyinroq qayta urinib ko'ring!",
    });
  }
};

const viewsProduct = async(req, res) => {
    try {
        const allProducts = await Product.find()
        if(!allProducts) {
            return res.status(400).json({message:"mahsulotlar topilmadi"})
        }

       return res.status(200).json({message: "Barcha mahsulotlar", allProducts})
    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Nimadir xato ketdi. Iltimos keyinroq qayta urinib ko'ring!",
        });
    }
};

const viewProduct = async(req, res) => {
  const {id} = req.params;
  try {
      const product = await Product.findById(id);
      if(!product) {
          return res.status(400).json({message: "Mahsulot topilmadi"})
      }
      return res.status(200).json({message: "Mahulot topildi", product})
  } catch (error) {
      console.log(error)
      res.status(500).json({
          message:"Nimadir xatolik ketdi. Iltimos keyinroq qayta urinib ko'ring!"
      })
  }
};

const deleteProduct = async(req, res) => {
  const {id} = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(!deletedProduct) {
      return res.status(400).json({message: "Id topilmadi"})
  }
  return res.status(200).json({message: "Mahsulot muafaqiyatli o'chirildi"})
} catch (error) {
  console.log(error);
   res.status(500).json({message:"Nimadir xatolik ketdi. Iltimos keyinroq urinib ko'ring"})
}
  
};

const paginations = async(req, res) => {
  try {
    // data
    const { page } = req.query;
    const itemsPerPage = 20;

    // validation
    if (page) {
      const pageNumber = parseInt(page);
      const skipCount = (pageNumber - 1) * itemsPerPage;

      // Count total movies
      const totalProducts = await Product.countDocuments();

      // Get paginated movies
      const product = await Product.find()
        .skip(skipCount)
        .limit(itemsPerPage);

      // send response
      res.send({
        data: product,
        totalProducts,
        totalPages: Math.ceil(totalProducts / itemsPerPage),
        currentPage: pageNumber,
      });
    } else {
      // send response
      res.send({
        message: "page maydoni qilinadi!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Nimadir xato ketdi!" });
  }
};

const search = async (req, res) => {
  const queryName = req.query.name;
  const similarityThreshold = req.query.similarity ?? 0.5;

  if (!queryName) {
    return res.status(400).json({
      message: `Yaroqsiz yoki tashlab ketilgan qidiruv parametri: ${queryName}`,
    });
  }

  const isCyrillic = /^[\u0400-\u04FF]+$/.test(queryName);
  const latinName = isCyrillic
    ? transliterateCyrillicToLatin(queryName)
    : queryName;

  try {
    const latinNameRegex = new RegExp(latinName, "i");
    const matchingProducts = await Product.find({ name: latinNameRegex });
    const exactMatches = [...matchingProducts];

    const fuzzySearchOptions = {
      shouldSort: true,
      threshold: similarityThreshold,
      includeMatches: true,
      keys: ["name", "latinName"],
    };

    const allItems = await Product.find({});
    
    const fuse = new Fuse(allItems.flat(), fuzzySearchOptions);
    const fuzzySearchResults = fuse.search(latinName);

    let message;
    if (exactMatches.length) {
      message = `Ushbu ${queryName} qidiruvga ko'ra mahsulotlar topildi!`;
    } else if (fuzzySearchResults.length) {
      message = `Ushbu ${queryName} qidiruvga ko'ra faqatgina o'xshash mahsulotlar topildi!`;
    } else {
      message = `Afsuski ushbu ${queryName} qidiruvga ko'ra xech qanday mahsulotlar topilmadi :(`;
    }

    res.status(200).json({ message, exact: exactMatches, similar: fuzzySearchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Nimadir xato ketdi!" });
  }
};

const filterByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    if (!category) {
      return res.status(400).json({ message: "Kategoriya parametri kiritilmagan" });
    }

    const filteredProducts = await Product.find({
      category: category,
    });

    if (!filteredProducts || filteredProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "Berilgan kategoriya uchun hech qanday mahsulot topilmadi" });
    }

    res
      .status(200)
      .json({ message: "Kategoriyaga qarashli mahsulotlar", products: filteredProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Nimadir xatolik ketdi. Iltimos, qaytadan urinib ko'ring" });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  viewsProduct,
  viewProduct,
  deleteProduct,
  paginations,
  search,
  filterByCategory
};
