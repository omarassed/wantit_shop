import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'

/*
Desc: Create a new order
Route: POST /api/orders
Access: Private
*/

const addOrderItems = asyncHandler(async(req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
   } = req.body

   //Check if there is an order items array and it's empty
   if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items')
    //If there are order items, then we proceed
   } else {
    const order = new Order({
    orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
    })
    const createOrder = await order.save();

    res.status(201).json(createOrder)
   }
})

/*
Desc: Get logged in user orders
Route: GET /api/orders/myorders
Access: Private
*/

const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.status(200).json(orders)
})

/*
Desc: Get order by ID
Route: GET /api/orders/:id
Access: Private
*/

const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

/*
Desc: Update order to 'paid'
Route: GET /api/orders/:id/pay
Access: Private
*/

const updateOrderToPaid = asyncHandler(async(req, res) => {
    res.send('update order to paid')
})

/*
Desc: Update order to delivered
Route: GET /api/orders/myorders
Access: Private
*/

const updateOrderToDelivered = asyncHandler(async(req, res) => {
    res.send('update order to delivered')
})

/*
Desc: Get all ordders
Route: GET /api/orders/myorders
Access: Private
*/

const getOrders = asyncHandler(async(req, res) => {
    res.send('Get all orders')
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}