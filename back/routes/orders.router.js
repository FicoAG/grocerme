const router = require('express').Router()

const {
   getAllUsersOrders,
   getOrderById,
   updateOrder,
   getAllVendorsOrders
} = require('../controlers/orders.controller')

router.get('/:userId', auth, getAllUsersOrders)
router.get('/:vendorId', getAllVendorsOrders)
router.get('/:id', getOrderById)
router.put('/:id', updateOrder)

module.exports = router
