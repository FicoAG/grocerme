const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor'
    },
    order: {
        type: String
    },
    service: {
        type: Boolean
    }
})

const orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel