var db = require('../common/datastore/mongolab.js');


exports.getAll = function (req, res) {
    //query the database for all clinics
    db.Clinics.find(function (err, clinics) {
        if (err) {
            console.log('ERROR:' + err);
            return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
        }
        if (!clinics || clinics.length === 0) {
            return res.send({message: 'No clinics found.'}, 400);
        }
        return res.send(clinics, 200);
    });
};


exports.getOneById = function (req, res) {
    //query the database for a clinic based on ID
    db.Clinics.findById( req.params.id, function (err, clinic) {
        if (err) {
            console.log('ERROR:' + err);
            return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
        }
        if (!clinic || clinic.length === 0) {
            return res.send({message: 'No clinic found.'}, 400);
        }
        return res.send(clinic, 200);
    });
};