'use strict';

var clinicsModule = angular.module('clinicsModule', []);

/** Controllers **/
clinicsModule.controller('clinicsController', ['$scope', '$location', 'clinicsService', function ($scope, $location, clinicsService) {
	$scope.clinics = undefined;
	clinicsService.getClinics().then(function (clinics) {
		$scope.clinics = clinics;
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
		$scope.clinics = undefined;
		//$scope.gps = "Latitude: " + position.coords.latitude + " Longitude: "+ position.coords.longitude;
		clinicsService.getClinicsByProximity(position.coords.latitude,position.coords.longitude,$scope.data.miles).then(function (clinics) {
			$scope.clinics = clinics;
		});
	};
	$scope.locate = function(){
		getLocation();
	};
}]);

clinicsModule.controller('clinicController', ['$scope', '$location', 'clinicsService', function ($scope, $location, clinicsService) {
	$scope.clinic = undefined;
	var id = $location.path().match(/\/clinics\/(.*)/)[1];

	clinicsService.getClinic(id).then(function (clinic) {
		$scope.clinic = clinic;
	});
}]);

/** Service Factories **/
clinicsModule.factory('clinicsService', ['$http', function ($http) {
	//TODO: use a config objects for all $http calls and implement some better non 200 status code handling
	var ClinicsService = {
		getClinics: function () {
			var promise = $http.get('http://localhost/api/clinics').then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
			});
			return promise;
		},
		getClinic: function (id) {
			var promise = $http.get('http://localhost/api/clinics/' + id).then(function (response) {
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
		getClinicsByProximity: function (lat,lng,miles) {
			var promise = $http.get('http://localhost/api/clinics/local/'+lng+'/'+lat+'/'+miles).then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
			});
			return promise;
		},
	}
	return ClinicsService;
}]);
