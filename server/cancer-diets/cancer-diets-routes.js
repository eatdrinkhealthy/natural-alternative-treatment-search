var db = require('../common/datastore/mongolab.js');


exports.getAll = function (req, res) {
	//query the database for all cancer diets
	db.CancerDiets.find(function (err, cancerDiets) {
		if (err) {
			console.log('ERROR:' + err);
			return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
		}
		if (!cancerDiets || cancerDiets.length === 0) {
			return res.send({message: 'No cancer diets found.'}, 400);
		}
		return res.send(cancerDiets, 200);
	});
};


exports.getOneById = function (req, res) {
	//query the database for a cancer diet based on ID
	db.CancerDiets.findById(req.params.id, function (err, cancerDiet) {
		if (err) {
			console.log('ERROR:' + err);
			return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
		}
		if (!cancerDiet || cancerDiet.length === 0) {
			return res.send({message: 'No cancer diet found.'}, 400);
		}
		return res.send(cancerDiet, 200);
	});
};