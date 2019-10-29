const router = require('express').Router()

const authUserRouter = require('./authUsers.router')
const authVendorRouter = require('./authVendors.router')
const usersRouter = require('./users.router')
const vendorsRouter = require('./vendors.router')
const ordersRouter = require('./vendors.router')

router.use('/auth/user', authUserRouter)
router.use('/auth/vendor', authVendorRouter)
router.use('/users', usersRouter)
router.use('/vendors', vendorsRouter)
router.use('/orders', ordersRouter)

module.exports = router
