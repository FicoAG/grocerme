const VendorModel = require('../models/vendors.model')

module.exports = {
  getAllVendors,
  getVendorById,
  getVendorByIdAuth,
  deleteVendorById,
  updateVendor,
  getVendorsPostalCategories,
  follow,
  unfollow
}

function getAllVendors (req, res) {
  console.log(req.query)
  const { postal, category } = req.query
  if (!postal && !category) {
    getAllVendorsFromDB()
      .then(vendors => {
        res.json(vendors)

      })
  } else {
    getVendorsFilterdByPostalAndCategoryFromDB(postal, category)
      .then(result => result.sort((a, b) => a.brand.localeCompare(b.brand)))
      .then(vendors => { res.json(vendors) })
      .catch((err) => handdleError(err, res))
  }
}

function getVendorsFilterdByPostalAndCategoryFromDB (postal, category) {
  return VendorModel
    .find({
      $or: [
        { $and: [{ 'mon.zone': { $elemMatch: { $eq: postal } } }, { category: { $eq: category } }] },
        { $and: [{ 'tue.zone': { $elemMatch: { $eq: postal } } }, { category: { $eq: category } }] },
        { $and: [{ 'wed.zone': { $elemMatch: { $eq: postal } } }, { category: { $eq: category } }] },
        { $and: [{ 'thu.zone': { $elemMatch: { $eq: postal } } }, { category: { $eq: category } }] },
        { $and: [{ 'fri.zone': { $elemMatch: { $eq: postal } } }, { category: { $eq: category } }] },
        { $and: [{ 'sat.zone': { $elemMatch: { $eq: postal } } }, { category: { $eq: category } }] },
        { $and: [{ 'sun.zone': { $elemMatch: { $eq: postal } } }, { category: { $eq: category } }] }
      ]
    }, { name: 1, category: 1, brand: 1 })
}

function getAllVendorsFromDB () {
  return VendorModel
    .find({}, { name: 1, category: 1, brand: 1 })
}

function getVendorById (req, res) {
  VendorModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getVendorByIdAuth (req, res) {
  VendorModel
    .findById(req.params.id)
    .then(vendor => {
      vendor.mon.users
      res.json(vendor)
    })
    .catch((err) => handdleError(err, res))
}

function deleteVendorById (req, res) {
  VendorModel
    .remove({
      _id: req.params.id
    })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}

function updateVendor (req, res) {
  VendorModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function follow (req, res) {
  VendorModel
    .findById(req.params.id)
    .then(vendor => {
      if (vendor.mon.zone.includes(res.locals.user.zipcode)) { vendor.mon.usersSubscribed.push(res.locals.user._id) }
      if (vendor.tue.zone.includes(res.locals.user.zipcode)) { vendor.tue.usersSubscribed.push(res.locals.user._id) }
      if (vendor.wed.zone.includes(res.locals.user.zipcode)) { vendor.wed.usersSubscribed.push(res.locals.user._id) }
      if (vendor.thu.zone.includes(res.locals.user.zipcode)) { vendor.thu.usersSubscribed.push(res.locals.user._id) }
      if (vendor.fri.zone.includes(res.locals.user.zipcode)) { vendor.fri.usersSubscribed.push(res.locals.user._id) }
      if (vendor.sat.zone.includes(res.locals.user.zipcode)) { vendor.sat.usersSubscribed.push(res.locals.user._id) }
      if (vendor.sun.zone.includes(res.locals.user.zipcode)) { vendor.sun.usersSubscribed.push(res.locals.user._id) }

      vendor.save()
        .then(_ => {
          res.json('Ok')
        })
        .catch((err) => handdleError(err, res))
    })
    .catch((err) => handdleError(err, res))
}

function unfollow (req, res) {
  VendorModel
    .findById(req.params.id)
    .then(vendor => {
      console.log(res.locals.user._id)
      const mon = vendor.mon.usersSubscribed
      const tue = vendor.tue.usersSubscribed
      const wed = vendor.wed.usersSubscribed
      const thu = vendor.thu.usersSubscribed
      const fri = vendor.fri.usersSubscribed
      const sat = vendor.sat.usersSubscribed
      const sun = vendor.sun.usersSubscribed
      if (mon.includes(res.locals.user._id)) { vendor.mon.usersSubscribed = mon.filter(id => id.toString() !== res.locals.user._id.toString()) }
      if (tue.includes(res.locals.user._id)) { vendor.tue.usersSubscribed = tue.filter(id => id.toString() !== res.locals.user._id.toString()) }
      if (wed.includes(res.locals.user._id)) { vendor.wed.usersSubscribed = wed.filter(id => id.toString() !== res.locals.user._id.toString()) }
      if (thu.includes(res.locals.user._id)) { vendor.thu.usersSubscribed = thu.filter(id => id.toString() !== res.locals.user._id.toString()) }
      if (fri.includes(res.locals.user._id)) { vendor.fri.usersSubscribed = fri.filter(id => id.toString() !== res.locals.user._id.toString()) }
      if (sat.includes(res.locals.user._id)) { vendor.sat.usersSubscribed = sat.filter(id => id.toString() !== res.locals.user._id.toString()) }
      if (sun.includes(res.locals.user._id)) { vendor.sun.usersSubscribed = sun.filter(id => id.toString() !== res.locals.user._id.toString()) }
      console.log(vendor.sun)
      vendor.save()
        .then(_ => {
          res.json('Ok')
        })
        .catch((err) => handdleError(err, res))
    })

    .catch((err) => handdleError(err, res))
}

function getVendorsPostalCategories (req, res) {
  console.log(req.params)
  VendorModel
    .find({
      $or: [
        { 'mon.zone': { $elemMatch: { $eq: req.params.postal } } },
        { 'tue.zone': { $elemMatch: { $eq: req.params.postal } } },
        { 'wed.zone': { $elemMatch: { $eq: req.params.postal } } },
        { 'thu.zone': { $elemMatch: { $eq: req.params.postal } } },
        { 'fri.zone': { $elemMatch: { $eq: req.params.postal } } },
        { 'sat.zone': { $elemMatch: { $eq: req.params.postal } } },
        { 'sun.zone': { $elemMatch: { $eq: req.params.postal } } }
      ]
    }, {
      category: 1, brand: 1, name: 1
    })
    .then(data => {
      const categories = []
      data.forEach(c => categories.push(c.category))
      const cats = categories.filter((cat, index) => categories.indexOf(cat) === index).sort()
      return res.json(cats)
    })
    .catch((err) => handdleError(err, res))
}

function handdleError (err, res) {
  console.log(err)

  return res.status(400).json(err)
}
