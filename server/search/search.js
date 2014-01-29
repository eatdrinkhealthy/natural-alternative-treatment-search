var db = require('../common/datastore/mongolab.js');

exports.all = function (req, res) {
	var queryResults = [];

	// Query Practitioners
	db.Practitioners.find(req.query, function (err, practitioners) {
		if (err) {
			console.log('ERROR:' + err);
			return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
		}

		// Query Clinics
		db.Clinics.find(req.query, function (err, clinics) {
			if (err) {
				console.log('ERROR:' + err);
				return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
			}

			// Query Treatments
			db.Treatments.find(req.query, function (err, treatments) {
				if (err) {
					console.log('ERROR:' + err);
					return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
				}

				// Query Cancer Diets
				db.CancerDiets.find(req.query, function (err, cancerDiets) {
					if (err) {
						console.log('ERROR:' + err);
						return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
					}
					res.send(queryResults.concat(practitioners, clinics, treatments, cancerDiets), 200);

				}); // Cancer Diets
			}); // Treatments
		}); // Clinics
	});// Practitioners
};