var db = require('../common/datastore/mongolab.js');


exports.getAll = function (req, res) {
	//query the database for all resources
	db.Resources.find(function (err, resources) {
		if (err) {
			console.log('ERROR:' + err);
			return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
		}
		if (!resources || resources.length === 0) {
			return res.send({message: 'No resources found.'}, 400);
		}
		return res.send(resources, 200);
	});
};


exports.getOneById = function (req, res) {
	//query the database for a resource based on ID
	db.Resources.findById(req.params.id, function (err, resource) {
		if (err) {
			console.log('ERROR:' + err);
			return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
		}
		if (!resource || resource.length === 0) {
			return res.send({message: 'No resource found.'}, 400);
		}
		return res.send(resource, 200);
	});
};