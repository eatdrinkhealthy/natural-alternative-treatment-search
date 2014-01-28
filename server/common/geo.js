var request = require("request");

        exports.getGeoCoded=function(clinics,cb){
        	var result = [];
        	var i =0;
        	
        	var next = function(clinic,done){
        		result.push(clinic);
        		
        		i++;
        		if(i == clinics.length){
   				cb(result);
   			}else{
	        		return clinic;
        		}
        		
        	}

		clinics.nonBlockingForEach(
			function(clinic){
				process(clinic,i,result,next);
			},
			function(){

			}
		);
		   	
        }



        var process = function(clinic,index,clinics,next){
			var doneCheck =function(){
				next(clinic);
			}
			if(clinic.geolocation.longitude==null || clinic.geolocation.latitude==null){
				var address = clinic.address; 
				for(param in address){
					if(address[param]==(undefined || null)){
						address[param]='';
					}
				}
		
				var assign = function(clinic,result,cb){
					clinic.geolocation.longitude = result.results[0].geometry.location.lng;
					clinic.geolocation.latitude = result.results[0].geometry.location.lat;
					cb(clinic);
					
				}
				geocode(clinic,address.street+"+"+address.city+"+"+address.state+"+"+address.zip,assign,doneCheck);

		
			}

	}

var geocode = function(clinic,address,callback,cb){
address=address.split(' ').join('+');

 var output = '';
	var options = {
                 host: 'http://maps.googleapis.com',
                 port: 80,
                 path: '/maps/api/geocode/json?address='+address+'&sensor=true',
                 method: 'GET'
                };        

request(options.host+options.path, function(error, response, body) {
	callback(clinic,JSON.parse(body),cb);
});


}
