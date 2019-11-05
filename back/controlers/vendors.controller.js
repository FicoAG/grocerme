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

  VendorModel
    .find({
      $or: [
        { $and: [{ 'mon.zone': { $elemMatch: { $eq: req.query.postal } } }, { category: { $eq: req.query.category } }] },
        { $and: [{ 'tue.zone': { $elemMatch: { $eq: req.query.postal } } }, { category: { $eq: req.query.category } }] },
        { $and: [{ 'wed.zone': { $elemMatch: { $eq: req.query.postal } } }, { category: { $eq: req.query.category } }] },
        { $and: [{ 'thu.zone': { $elemMatch: { $eq: req.query.postal } } }, { category: { $eq: req.query.category } }] },
        { $and: [{ 'fri.zone': { $elemMatch: { $eq: req.query.postal } } }, { category: { $eq: req.query.category } }] },
        { $and: [{ 'sat.zone': { $elemMatch: { $eq: req.query.postal } } }, { category: { $eq: req.query.category } }] },
        { $and: [{ 'sun.zone': { $elemMatch: { $eq: req.query.postal } } }, { category: { $eq: req.query.category } }] }
      ]
    }, { name: 1, category: 1, brand: 1 })
    .then(result => result.sort((a, b) => a.brand.localeCompare(b.brand)))
    .then(vendors => { res.json(vendors) })
    .catch((err) => handdleError(err, res))
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
      console.log(vendor.get('mon').zone)
      if (vendor.get('mon').zone.includes(res.locals.user.zipcode)) { vendor.get('mon').usersSubscribed.push(res.locals.user._id) }
      if (vendor.get('tue').zone.includes(res.locals.user.zipcode)) { vendor.get('tue').usersSubscribed.push(res.locals.user._id) }
      if (vendor.get('wed').zone.includes(res.locals.user.zipcode)) { vendor.get('wed').usersSubscribed.push(res.locals.user._id) }
      if (vendor.get('thu').zone.includes(res.locals.user.zipcode)) { vendor.get('thu').usersSubscribed.push(res.locals.user._id) }
      if (vendor.get('fri').zone.includes(res.locals.user.zipcode)) { vendor.get('fri').usersSubscribed.push(res.locals.user._id) }
      if (vendor.get('sat').zone.includes(res.locals.user.zipcode)) { vendor.get('sat').usersSubscribed.push(res.locals.user._id) }
      if (vendor.get('sun').zone.includes(res.locals.user.zipcode)) { vendor.get('sun').usersSubscribed.push(res.locals.user._id) }

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
      if (vendor.get('mon').usersSubscribed.includes(res.locals.user._id)) { vendor.get('mon').usersSubscribed = vendor.get('mon').usersSubscribed.filter(user => user !== res.locals.user._id) }
      if (vendor.get('tue').usersSubscribed.includes(res.locals.user._id)) { vendor.get('tue').usersSubscribed = vendor.get('tue').usersSubscribed.filter(user => user !== res.locals.user._id) }
      if (vendor.get('wed').usersSubscribed.includes(res.locals.user._id)) { vendor.get('wed').usersSubscribed = vendor.get('wed').usersSubscribed.filter(user => user !== res.locals.user._id) }
      if (vendor.get('thu').usersSubscribed.includes(res.locals.user._id)) { vendor.get('thu').usersSubscribed = vendor.get('thu').usersSubscribed.filter(user => user !== res.locals.user._id) }
      if (vendor.get('fri').usersSubscribed.includes(res.locals.user._id)) { vendor.get('fri').usersSubscribed = vendor.get('fri').usersSubscribed.filter(user => user !== res.locals.user._id) }
      if (vendor.get('sat').usersSubscribed.includes(res.locals.user._id)) { vendor.get('sat').usersSubscribed = vendor.get('sat').usersSubscribed.filter(user => user !== res.locals.user._id) }
      if (vendor.get('sun').usersSubscribed.includes(res.locals.user._id)) { vendor.get('sun').usersSubscribed = vendor.get('sun').usersSubscribed.filter(user => user !== res.locals.user._id) }
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
