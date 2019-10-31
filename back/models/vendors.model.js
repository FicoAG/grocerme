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
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
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
    enum: ['frosted', 'bakery', 'fruits & vegetables', 'water']
  },
  brand: {
    type: String
  },
  mon: { daySchema },
  tue: { daySchema },
  wed: { daySchema },
  thu: { daySchema },
  fri: { daySchema },
  sat: { daySchema },
  sun: { daySchema },

  createdAt: {
    type: Date,
    default: Date.now() // Get a timestamp :)
  }
})

const vendorModel = mongoose.model('vendor', vendorSchema)

module.exports = vendorModel
