import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/v1/orders
// @access private
export const addOrderItems = asyncHandler(async (req, res) => {

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice,
        shippingPrice, totalPrice } = req.body

    if (orderItems?.length === 0) {
        res.status(400)
        throw new Error('No Order Items');
    } else {
        console.log(req.body);
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice

        })

        const createdOrder = await order.save()
        res.status(200).json(createdOrder)
    }


})


// @desc Get order by id
// @route GET /api/v1/orders/:id
// @access private
export const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order not found')
    }

})

// @desc Get all orders
// @route GET /api/v1/orders/
// @access private
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name email')
    res.json(orders)
})
