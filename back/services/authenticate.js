const UserModel = require('../models/users.model')
const VendorModel = require('../models/vendors.model')
const jwt = require('jsonwebtoken')

const authenticated = (req, res, next) => {
  jwt.verify(req.headers.token, 'secret', (err, token) => {
    if (err) { return res.status(403).json({ error: 'Token not valid' }) }

    if (token.isVendor) {
      VendorModel
        .findOne({ email: token.email })
        .then(vendor => {
          res.locals.vendor = vendor
          next()
        })
    } else {
      UserModel
        .findOne({ email: token.email })
        .then(user => {
          res.locals.user = user
          next()
        })
    }
  })
}

const me = (req, res, next) => {
  if (req.params.id === res.locals.user._id) {
    next()
  } else {
    req.status(403).json({ err: `You are not ${req.params.id} so you cant do a ${req.method}` })
  }
}

module.exports = {
  authenticated,
  me
}
