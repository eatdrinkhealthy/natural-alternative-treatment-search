/* 	Include request libary for async http requests */
var request = require("request");

/* 	This function gets an array of objects and processes each of them
*	The result being an array of objects with the lat/lng included, if it was null
*/
exports.getGeoCoded = function (clinics, cb) {
	var result = []; /* The resulting array */
	var i = 0;
	var next = function (clinic, done) {
		result.push(clinic);
		i++;
		if (i == clinics.length) {
			cb(result);
		} else {
			return clinic;
		}
	}
	/* The nonBlockingForEach is a function that is like ForEach, except that
	*  It does not block the thread by using node's nextTick
	*/
	clinics.nonBlockingForEach(function (clinic) {
			process(clinic,result, next);
		},function () {}
	);
}

/*	takes an element of an array, that element's array, and a callback and checks to see if that element
*	is missing a lat or a lng. If so, it calls another function (geocode) which uses the google 
*	Api to find the geocoded address. it also searches the address to determine if there are any missing
*	paramaters before it sends it to google so an err is not thrown
*/
var process = function (clinic, clinics, next) {
	/* when everying in the process is done, this function calls the next callback with the modified result in it */
	var doneCheck = function () {
		next(clinic);
	}
	if (clinic.geo[0] == null || clinic.geo[1] == null) {
		var address = clinic.address;
		for (param in address) {
			if (address[param] == (undefined || null)) {
				address[param] = '';
			}
		}
		
		/*	Gets an element, the result of the geocoded element, and a callback.
		*	It assignes the result of the geocode to the element, then calls the done callback
		*/
		var assign = function (clinic, result, cb) {
			clinic.geo[0] = result.results[0].geometry.location.lng;
			clinic.geo[1] = result.results[0].geometry.location.lat;
			cb(clinic);
		}
		geocode(clinic, address.street + "+" + address.city + "+" + address.state + "+" + address.zip, assign, doneCheck);

	}else{
		next(clinic);	
	}
}

/*	gets an element of an array and its address, a callback function and an pararmater of that callback's function
*	(cb) and then performs an async request to google asking for the lat/lng of the address. 
*	when the request comes back, the clinic,the google response, and the next callback (cb) is passed into the 
*	callback. 
*/
var geocode = function (clinic, address, callback, cb) {
	address = address.split(' ').join('+');
	var options = {
		host: 'http://maps.googleapis.com',
		port: 80,
		path: '/maps/api/geocode/json?address=' + address + '&sensor=true',
		method: 'GET'
	};
	request(options.host + options.path, function (error, response, body) {
		callback(clinic, JSON.parse(body), cb);
	});
}
