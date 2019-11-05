const router = require('express').Router()
const { me, authenticated } = require('../services/authenticate')

const {
  getAllUsersOrders,
  getOrderById,
  updateOrder,
  getAllVendorsOrders
} = require('../controlers/orders.controller')

router.get('/:userId', authenticated, getAllUsersOrders)
router.get('/:vendorId', getAllVendorsOrders)
router.get('/:id', getOrderById)
router.put('/:id', updateOrder)

module.exports = router
