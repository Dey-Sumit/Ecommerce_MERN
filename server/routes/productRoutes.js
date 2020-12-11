import express from "express"
import {
   createProduct,
   createProductReview,
   deleteProductById,
   getProductById,
   getProducts,
   getTopRatedProducts,
   updateProductById,
} from "../controllers/productController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/top").get(getTopRatedProducts)
router.get("/", getProducts)
// router.route('/').get(getProducts)

router
   .route("/:id")
   .get(getProductById)
   .delete(protect, admin, deleteProductById)
   .put(protect, admin, updateProductById)
router.route("/").post(protect, admin, createProduct)
router.route("/:id/review").post(createProductReview)

export default router
