const VendorModel = require('../models/vendors.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  signupVendor,
  loginVendor
}

function signupVendor (req, res) {
  const hashedPwd = bcrypt.hashSync(req.body.vendor_password, 10)
  const vendorBody = {
    name: req.body.vendor_name,
    email: req.body.vendor_email,
    password: hashedPwd
  }

  VendorModel
    .create(vendorBody)
    .then((newVendor) => {
      const vendorData = {
        vendorname: req.body.vendor_name,
        email: req.body.vendor_email,
        isVendor: true,
        _id : newVendor._id
      }

      const token = jwt.sign(
        vendorData,
        'secret', // TODO SECRET MORE SECRET PLEASE
        { expiresIn: '1w' }
      )

      return res.json({ token: token, ...vendorData })
    })
    .catch((err) => {
      res.status(403).json({
        error: err
      })
    })
}

function loginVendor (req, res) {
  VendorModel
    .findOne({ email: req.body.vendor_email })
    .then(vendor => {
      if (!vendor) { return res.json({ error: 'wrong email' }) }

      bcrypt.compare(req.body.vendor_password, vendor.password, (err, result) => {
        if (err) { throw new Error(err) }

        if (!result) {
          return res.json({ error: `wrong password for ${req.body.vendor_email}` })
        }

        const vendorData = {
          vendorname: vendor.name,
          email: vendor.email,
          isVendor: true,
          _id: vendor._id
        }

        const token = jwt.sign(
          vendorData,
          'secret', // TODO SECRET MORE SECRET PLEASE
          {
            expiresIn: '1w'
          }
        )

        return res.json({
          token: token,
          ...vendorData
        })
      })
    })
    .catch(err => handdleError(err, res))
}

function handdleError (err, res) {
  return res.status(400).json(err)
}
