import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

// @desc Fetch all products
// @route GET /api/products
// @access public
export const getProducts = asyncHandler(async (req, res) => {
   const keyword = req.query.keyword
      ? {
           name: {
              $regex: req.query.keyword,
              $options: "i",
           },
        }
      : {}
   const products = await Product.find({ ...keyword }) // empty object returns everything

   res.json(products)
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access public
export const getProductById = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id)

   if (product) res.json(product)
   else {
      res.status(404)
      throw new Error("Product Not Found")
   }
})
// @desc Delete single product
// @route DELETE /api/products/:id
// @access private/admin
export const deleteProductById = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id)
   if (product) {
      await product.remove()
      res.json({ message: "Product Removed" })
   } else {
      res.status(404)
      throw new Error("Product Not Found")
   }
})

// @desc Create single product
// @route POST /api/products/
// @access private/admin
export const createProduct = asyncHandler(async (req, res) => {
   const product = new Product({
      name: "Sample Name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      category: "Sample category",
      brand: "Sample brand",
      countInStock: 0,
      numOfReviews: 0,
      description: "Sample Description",
   })

   const createdProduct = await product.save()
   res.status(201).json(createdProduct)
})

// @desc Update single product
// @route PUT /api/products/
// @access private/admin
export const updateProductById = asyncHandler(async (req, res) => {
   const {
      name,
      price,
      brand,
      category,
      countInStock,
      image,
      description,
   } = req.body
   const product = await Product.findById(req.params.id)

   if (product) {
      product.name = name
      product.price = price
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
      product.image = image
      product.description = description

      const updatedProduct = await product.save()
      res.status(201).json(updatedProduct)
   } else {
      res.status(404)
      throw new Error("Product not found")
   }
   const createdProduct = await product.save()
   res.status(201).json(createdProduct)
})

// @desc Create new review
// @route POST /api/products/:id/review
// @access private/

export const createProductReview = asyncHandler(async (req, res) => {
   const { rating, comment } = req.body

   const product = await Product.findById(req.params.id)

   if (product) {
      const alreadyReviewed = product.reviews.find(
         r => r.user.toString() === req.user._id.toString()
      )
      if (alreadyReviewed) throw new Error("Product already reviewed")

      const review = {
         name: req.user.name,
         rating: Number(rating),
         comment,
         user: req.user._id,
      }
      product.reviews.push(review)
      product.numOfReviews = product.reviews.length

      product.rating =
         product.reviews.reduce((acc, item) => item.rating + acc, 0) /
         product.review.length
      await product.save()
      res.status(201).json({ message: "Review Added" })
   }
})

// @desc Fetch top rated products
// @route GET /api/products/top
// @access public
export const getTopRatedProducts = asyncHandler(async (req, res) => {
   console.log(req)
   console.log("LOL")
   const products = await Product.find({}).sort({ rating: -1 }).limit(3) // empty object returns everything

   res.json(products)
})
