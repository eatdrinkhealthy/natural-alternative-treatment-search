var db = require('../common/datastore/mongolab.js');
var geo = require('../common/geo.js');


/**
 * Allow other processes to execute while iterating over
 * an array. Useful for large arrays, or long-running processing
 *
 * @param {Function} fn    iterator fed each element of the array.
 * @param {Function} next  executed when done
 */
Array.prototype.nonBlockingForEach = function (fn, next) {
	var arr = this;
	var i = 0;
	var len = arr.length;

	function iter() {
		if (i < len) {
			fn(arr[i]);
			i++;
			process.nextTick(iter);
		} else {
			next();
		}
	}

	iter();
};
exports.add = function (req, res) {
	//test using curl: curl -X POST -H "Content-Type: application/json" -d '{"address": {"street": "200 S. W. First Street","city": "Rochester","state": "MN","zip": "55905"},"name": "Mayo Clinic"}' http://localhost/api/clinics
	var practitioner = {
		address: {
			street: req.body.address.street,
			city: req.body.address.city,
			state: req.body.address.state,
			zip: req.body.address.zip
		},
		name: req.body.name,
		geo:[req.body.geo==undefined ? null : req.body.geo[0] ,req.body.geo==undefined ? null : req.body.geo[1] ]
	};
	geo.getGeoCoded([practitioner],function(result){
		db.Practitioners.create(result[0],function(err,result){
	        	return res.send(result, 200);		
		});
        });
};

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

exports.getAllByProximity = function (req, res) {
	var lat = req.params.lat;
	var lng = req.params.lng;
	var miles = req.params.miles;
	

	//query the database for all clinics near lat/lng
	db.Practitioners.findNearby(lat,lng,miles,function (err, practitioners) {
		if (err) {
			console.log('ERROR:' + err);
			return res.send({message: 'A server-side error occurred. Please try again later.'}, 500);
		}
		if (!practitioners || practitioners.length === 0) {
			return res.send({message: 'No practitioners found.'}, 400);
		}

	
	       	//gets an array of practitioners and then geocodes them if they are null 
		geo.getGeoCoded(practitioners,function(result){
			return res.send(result, 200);
		});


	});
};
