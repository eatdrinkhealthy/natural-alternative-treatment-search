'use strict';

var cancerDietsModule = angular.module('cancerDietsModule', []);

/** Controllers **/
cancerDietsModule.controller('cancerDietsController', ['$scope', '$location', 'cancerDietsService', function ($scope, $location, cancerDietsService) {
	$scope.cancerDiets = undefined;
	cancerDietsService.getCancerDiets().then(function (cancerDiets) {
		$scope.cancerDiets = cancerDiets;
	});

}]);

cancerDietsModule.controller('cancerDietController', ['$scope', '$location', 'cancerDietsService', function ($scope, $location, cancerDietsService) {
	$scope.cancerDiet = undefined;
	var id = $location.path().match(/\/cancer-diets\/(.*)/)[1];

	cancerDietsService.getCancerDiet(id).then(function (cancerDiet) {
		$scope.cancerDiet = cancerDiet;
	});
}]);

/** Service Factories **/
cancerDietsModule.factory('cancerDietsService', ['$http', function ($http) {
	//TODO: use a config objects for all $http calls and implement some better non 200 status code handling
	var CancerDietsService = {
		getCancerDiets: function () {
			var promise = $http.get('/api/cancer-diets').then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
			});
			return promise;
		},
		getCancerDiet: function (id) {
			var promise = $http.get('/api/cancer-diets/' + id).then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
				;
			});
			return promise;
		}
	}
	return CancerDietsService;
}]);