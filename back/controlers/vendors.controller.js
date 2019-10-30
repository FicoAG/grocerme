const VendorModel = require('../models/vendors.model')

module.exports = {
    getAllVendors,
    getVendorById,
    deleteVendorById,
    updateVendor,
    getVendorsPostal
}

function getAllVendors(req, res) {
    VendorModel
        .find()
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function getVendorById(req, res) {
    VendorModel
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function deleteVendorById(req, res) {
    VendorModel
        .remove({
            _id: req.params.id
        })
        .then(response => res.json(response))
        .catch(err => handdleError(err, res))
}

function updateVendor(req, res) {
    VendorModel
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function getVendorsPostal(req, res) {
    VendorModel
        .find()
        .then(data => {
            const filtrados = data.filter(v => {
                return v.mon.zone.includes(req.params.postal) ||
                    v.tue.zone.includes(req.params.postal) ||
                    v.wed.zone.includes(req.params.postal) ||
                    v.thu.zone.includes(req.params.postal) ||
                    v.fri.zone.includes(req.params.postal) ||
                    v.sat.zone.includes(req.params.postal) ||
                    v.sun.zone.includes(req.params.postal)
            });
            return filtrados;
        })
        .then(filtrados => {
            let results = {};
            filtrados.forEach(filtrado => {
                if (!results[filtrado.category]){
                    results[filtrado.category] = [];
                }
                results[filtrado.category].push(filtrado);
            })
            return res.json(results)
        })
        .catch((err) => handdleError(err, res))
}

function handdleError(err, res) {
    return res.status(400).json(err)
}