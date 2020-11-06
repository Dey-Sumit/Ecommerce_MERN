import express from 'express'
import { authUser, getAllUsers, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router()



router.post('/login', authUser)
router.post('/register', registerUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router.route('/').get(protect, admin, getAllUsers)


export default router;