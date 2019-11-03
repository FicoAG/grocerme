const OrderModel = require('../models/orders.model')

module.exports = {
  getAllUsersOrders,
  getOrderById,
  updateOrder,
  getAllVendorsOrders
}
/// GET /api/orders?userId=12312313
/// GET /api/orders?vendorId12312313
function getAllUsersOrders (req, res) {
  OrderModel
    .find({ userId: req.params.userId })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getAllVendorsOrders (req, res) {
  OrderModel
    .find({ vendorId: req.params.userId })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getOrderById (req, res) {
  OrderModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateOrder (req, res) {
  OrderModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function handdleError (err, res) {
  return res.status(400).json(err)
}
