const mongoose = require('mongoose')

const daySchema = new mongoose.Schema({
  zone: [{ type: String }],
  usersSubscribed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order'
  }]
})

// const dayModel = mongoose.model('day', daySchema)

module.exports = daySchema
