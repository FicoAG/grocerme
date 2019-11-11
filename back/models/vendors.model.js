const mongoose = require('mongoose')
const daySchema = require('./day.model')

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator (value) {
        return true
        // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
      }
    },
    unique: [true, 'This is email is registered']
  },
  password: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Frosted', 'Bakery', 'Fruits', 'Water']
  },
  brand: {
    type: String
  },
  mon: {
    zone: [{ type: String }],
    usersSubscribed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order'
    }]
  },
  tue: {
    zone: [{ type: String }],
    usersSubscribed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order'
    }]
  },
  wed: {
    zone: [{ type: String }],
    usersSubscribed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order'
    }]
  },
  thu: {
    zone: [{ type: String }],
    usersSubscribed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order'
    }]
  },
  fri: {
    zone: [{ type: String }],
    usersSubscribed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order'
    }]
  },
  sat: {
    zone: [{ type: String }],
    usersSubscribed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order'
    }]
  },
  sun: {
    zone: [{ type: String }],
    usersSubscribed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }],
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order'
    }]
  },

  createdAt: {
    type: Date,
    default: Date.now() // Get a timestamp :)
  }
})

const vendorModel = mongoose.model('vendor', vendorSchema)

module.exports = vendorModel
