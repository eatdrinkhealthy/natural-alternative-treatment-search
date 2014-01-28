var db = require('../common/datastore/mongolab.js');


exports.getAll = function (req, res) {
	//query the database for all practitioners
	db.Practitioners.find(function (err, practitioners) {
		if (err) {
			console.log('ERROR:' + err);
			return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
		}
		if (!practitioners || practitioners.length === 0) {
			return res.send({message: 'No practitioners found.'}, 400);
		}
		return res.send(practitioners, 200);
	});
};


exports.getOneById = function (req, res) {
	//query the database for a practitioner based on ID
	db.Practitioners.findById(req.params.id, function (err, practitioner) {
		if (err) {
			console.log('ERROR:' + err);
			return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
		}
		if (!practitioner || practitioner.length === 0) {
			return res.send({message: 'No practitioner found.'}, 400);
		}
		return res.send(practitioner, 200);
	});
};