const router = require('express').Router()

const {
    loginVendor,
    signupVendor
} = require('../controlers/authVendors.controller')

router.post('/signup', signupVendor)
router.post('/login', loginVendor)

module.exports = router
