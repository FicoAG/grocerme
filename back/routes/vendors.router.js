const router = require('express').Router()
const { me, authenticated } = require('../services/authenticate')

const {
  getAllVendors,
  getVendorById,
  deleteVendorById,
  updateVendor,
  getVendorsPostalCategories,
  follow,
  unfollow
} = require('../controlers/vendors.controller')

router.get('/', getAllVendors)
router.get('/category/:postal', getVendorsPostalCategories)
router.get('/:id/follow', authenticated, follow)
router.get('/:id/unfollow', authenticated, unfollow)
router.get('/:id', getVendorById)
router.delete('/:id', authenticated, me, deleteVendorById)
router.put('/:id', authenticated, updateVendor)

module.exports = router
