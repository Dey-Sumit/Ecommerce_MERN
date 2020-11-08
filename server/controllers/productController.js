import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc Fetch all products
// @route GET /api/products
// @access public
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}) // empty object returns everything

    res.json(products)
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access public
export const getProductById = asyncHandler(async (req, res) => {
    console.log("get product");
    const product = await Product.findById(req.params.id)

    if (product)
        res.json(product)
    else {
        res.status(404)
        throw new Error('Product Not Found')
    }
}
)
// @desc Delete single product
// @route DELETE /api/products/:id
// @access private/admin
export const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    }
    else {
        res.status(404)
        throw new Error('Product Not Found')
    }
}
)

// @desc Create single product
// @route POST /api/products/
// @access private/admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        category: "Sample category",
        brand: "Sample brand",
        countInStock: 0,
        numOfReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
}
)
// @desc Update single product
// @route PUT /api/products/
// @access private/admin
export const updateProductById = asyncHandler(async (req, res) => {
    const { name, price, brand, category, countInStock, image, description } = req.body;
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.image = image

        const updatedProduct = await Product.save()
        res.status(201).json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
}
)