const VendorModel = require('../models/vendors.model')

module.exports = {
  getAllVendors,
  getVendorById,
  deleteVendorById,
  updateVendor,
  getVendorsPostalCategories
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
    .then( response => res.json(response))
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
