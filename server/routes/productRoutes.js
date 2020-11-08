import express from 'express'
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getProducts)
// router.route('/').get(getProducts)

router.route('/:id').get(getProductById)
    .delete(protect, admin, deleteProductById)
    .put(protect, admin, updateProductById)
router.route('/')
    .post(protect, admin, createProduct)

export default router;