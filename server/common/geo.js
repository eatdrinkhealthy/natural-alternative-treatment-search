var request = require("request");

        exports.process = function(clinic,index,clinics,next){
			var doneCheck =function(){
				//if(index==array.length-1){
					clinics.push(clinic);
					//console.log(clinics.length);
					console.log(clinic);
					/*
				}else{
					return clinic;
				}
				console.log("Done Check Fired but has nothing to return?");
				*/
				console.log(index+" -- "+clinics.length);
				var done = index==clinics.length ? true : false; 
				
				next(clinic,done);
			}
			if(clinic.geolocation.longitude==null || clinic.geolocation.latitude==null){
				var address = clinic.address; 
				for(param in address){
					if(address[param]==(undefined || null)){
						address[param]='';
					}
					//console.log(address[param]);
				}
		
				var assign = function(clinic,result,cb){
					clinic.geolocation.longitude = result.results[0].geometry.location.lng;
					clinic.geolocation.latitude = result.results[0].geometry.location.lat;
					cb(clinic);
					
				}
				geocode(clinic,address.street+"+"+address.city+"+"+address.state+"+"+address.zip,assign,doneCheck);
				//assign("OK",doneCheck);
		
			}

	}

var geocode = function(clinic,address,callback,cb){
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
  //console.log(body);
   callback(clinic,JSON.parse(body),cb);
});

/*
    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
       
        console.log(options.host + ':' + res.statusCode);
        //res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            finished();
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
  */

}
