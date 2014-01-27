var request = require("request");

var ii=0;
        exports.process = function(clinic,clinics,next){
        console.log("ii: "+ii);
        ii++;
			var doneCheck =function(updatedClinic){
				next(updatedClinic);
			}
			if(clinic.geolocation.longitude==null || clinic.geolocation.latitude==null){
				var address = clinic.address; 
				for(param in address){
					if(address[param]==(undefined || null)){
						address[param]='';
					}
					//console.log(address[param]);
				}
		
				var assign = function(clinic,googleJson,cb){
					clinic.geolocation.longitude = googleJson.results[0].geometry.location.lng;
					clinic.geolocation.latitude = googleJson.results[0].geometry.location.lat;
					cb(clinic);
					
				}
				geocode(clinic,address.street+"+"+address.city+"+"+address.state+"+"+address.zip,assign,doneCheck);
				//assign("OK",doneCheck);
		
			}

	}

var g=0;
var geocode = function(clinic,address,callback,done){
	address=address.split(' ').join('+');
	console.log(address);
	var output = '';
	var options = {
	         host: 'http://maps.googleapis.com',
	         port: 80,
	         path: '/maps/api/geocode/json?address='+address+'&sensor=true',
	         method: 'GET'
	};        

	request(options.host+options.path, function(error, response, body) {
			g++;console.log("G:"+g);
		   callback(clinic,JSON.parse(body),done);
	});

}
