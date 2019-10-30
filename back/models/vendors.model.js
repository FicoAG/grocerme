const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator(value) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
            }
        },
        unique: [true, 'This is email is registered']
    },
    password: {
        type: String,
        required: true
    },
    category : {
        type : String, 
        enum: ["frosted", "bakery", "fruits & vegetables", "water"]
    },

    brand: {
        type: String,
    },
    mon: {
        zone : [{
            type : String,

        }],
        usersSubscribed : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            }
        ],
        orders : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'order',
                required: true
            }
        ]
    },
    tue: {
            zone: [{
                type: String,

            }],
            usersSubscribed: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }],
            orders: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'order',
                required: true
            }]
    },
    wed: {
        zone : [{
            type : String,

        }],
        usersSubscribed : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            }
        ],
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
            required: true
        }]
    },
    thu: {
        zone : [{
            type : String,

        }],
        usersSubscribed : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            }
        ],
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
            required: true
        }]
    },
    fri: {
        zone : [{
            type : String,

        }],
        usersSubscribed : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : 'user'
            }
        ],
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
            required: true
        }]
    },
    sat: {
        zone : [{
            type : String,

        }],
        usersSubscribed : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            }
        ],
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
            required: true
        }]
    },
    sun: {
        zone : [{
            type : String,

        }],
        usersSubscribed : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            }
        ],
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
            required: true
        }]
    },

    createdAt: {
        type: Number,
        default: Date.now() // Get a timestamp :)
    }
})

const vendorModel = mongoose.model('vendor', vendorSchema)

module.exports = vendorModel
