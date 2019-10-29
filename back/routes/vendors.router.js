const router = require('express').Router()
const {
    me,
    authenticated
} = require('../services/authenticate');

const {
    getAllVendors,
    getVendorById,
    deleteVendorById,
    updateVendor,
    getVendorsPostal
} = require('../controlers/vendors.controller')

router.get('/', getAllVendors)
router.get('/postal/:postal', getVendorsPostal)
router.get('/:id', getVendorById)
router.delete('/:id', authenticated, me, deleteVendorById)
router.put('/:id', authenticated, me, updateVendor)

module.exports = router