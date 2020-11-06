import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateWebToken.js';


// @desc Auth User & grt token
// @route POST /api/v1/users/
// @access private

export const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })
    console.log(user);
    if (user && (await user.matchPassword(password))) {
        const { _id, name, email, isAdmin } = user
        res.json({
            _id,
            name, email, isAdmin,
            token: generateToken(_id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})



// @desc Get User profile
// @route POST /api/v1/users/profile
// @access private

export const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        const { _id, name, email, isAdmin } = user
        res.json({
            _id, name, email, isAdmin
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})



// @desc Update User profile
// @route PUT /api/v1/users/profile
// @access private

export const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        const { _id, name, email, isAdmin } = updatedUser
        res.json({
            _id, name, email, isAdmin, token: generateToken(_id)
        })

    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})






// @desc Register user
// @route POST /api/v1/users/register
// @access private

export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({ name, email, password })
    if (user) {

        const { _id, name, email, isAdmin } = user
        res.json({
            _id,
            name,
            email,
            isAdmin,
            token: generateToken(_id)
        })
    } else {
        res.status(400)
        throw new Error('User not crated')
    }

})


//@desc GET all users
//@route GET /api/v1/users
//@access Private/Admin


export const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})

    res.json(users)
})






