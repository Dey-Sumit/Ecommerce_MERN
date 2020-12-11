import express from 'express'

import { addOrderItems, getOrderById } from '../controllers/OrderController.js';
import { getProducts } from '../controllers/productController.js';

import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router()


router.route('/').post(protect, addOrderItems)
    .get(protect, admin, getProducts)

router.route('/:id').get(protect, getOrderById)

export default router;