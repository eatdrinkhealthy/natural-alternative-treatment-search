var db = require('../common/datastore/mongolab.js');


exports.getAll = function (req, res) {
    //query the database for all treatments
    db.Treatments.find(function (err, treatments) {
        if (err) {
            console.log('ERROR:' + err);
            return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
        }
        if (!treatments || treatments.length === 0) {
            return res.send({message: 'No treatments found.'}, 400);
        }
        return res.send(treatments, 200);
    });
};


exports.getOneById = function (req, res) {
    //query the database for a treatment based on ID
    db.Treatments.findById( req.params.id, function (err, treatment) {
        if (err) {
            console.log('ERROR:' + err);
            return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
        }
        if (!treatment || treatment.length === 0) {
            return res.send({message: 'No treatment found.'}, 400);
        }
        return res.send(treatment, 200);
    });
};