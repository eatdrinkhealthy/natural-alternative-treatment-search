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
		console.log(i);
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

		        var finished = function(rData){
        	return res.send(rData, 200);
        }

       	//gets an array of clinics and then geocodes them if they are null 
	geo.getGeoCoded(clinics,function(rData){
        	return res.send(rData, 200);
        });
        
	});
};


exports.getOneById = function (req, res) {
	//query the database for a clinic based on ID
	db.Clinics.findById(req.params.id, function (err, clinic) {
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
