'use strict';

var practitionersModule = angular.module('practitionersModule', []);

/** Controllers **/
practitionersModule.controller('practitionersController', ['$scope', '$location', 'practitionersService', function ($scope, $location, practitionersService) {
	$scope.practitioners = undefined;
	practitionersService.getPractitioners().then(function (practitioners) {
		$scope.practitioners = practitioners;
	});
	$scope.data = {};
	var getLocation = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};
	var showPosition = function(position) {
		$scope.practitioners = undefined;
		//$scope.gps = "Latitude: " + position.coords.latitude + " Longitude: "+ position.coords.longitude;
		practitionersService.getPractitionersByProximity(position.coords.latitude,position.coords.longitude,$scope.data.miles).then(function (clinics) {
			$scope.practitioners = clinics;
		});
	};
	$scope.locate = function(){
		getLocation();
	};
}]);

practitionersModule.controller('practitionerController', ['$scope', '$location', 'practitionersService', function ($scope, $location, practitionersService) {
	$scope.practitioner = undefined;
	var id = $location.path().match(/\/practitioners\/(.*)/)[1];

	practitionersService.getPractitioner(id).then(function (practitioner) {
		$scope.practitioner = practitioner;
	});
}]);

/** Service Factories **/
practitionersModule.factory('practitionersService', ['$http', function ($http) {
	//TODO: use a config objects for all $http calls and implement some better non 200 status code handling
	var PractitionersService = {
		getPractitioners: function () {
			var promise = $http.get('/api/practitioners').then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
			});
			return promise;
		},
		getPractitioner: function (id) {
			var promise = $http.get('/api/practitioners/' + id).then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
				;
			});
			return promise;
		},
		getPractitionersByProximity: function (lat,lng,miles) {
			var promise = $http.get('/api/practitioners/local/'+lng+'/'+lat+'/'+miles).then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
			});
			return promise;
		},
		addPractitioner: function(practitioner){

			var config = {
				method: 'POST',
				url: '/api/practitioners',
				data: practitioner
			}
			var promise = $http(config).then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
			});
			return promise;
		}
	}
	return PractitionersService;
}]);
