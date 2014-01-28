'use strict';

var treatmentsModule = angular.module('treatmentsModule', []);

/** Controllers **/
treatmentsModule.controller('treatmentsController', ['$scope', '$location', 'treatmentsService', function ($scope, $location, treatmentsService) {
	$scope.treatments = undefined;
	treatmentsService.getTreatments().then(function (treatments) {
		$scope.treatments = treatments;
	});

}]);

treatmentsModule.controller('treatmentController', ['$scope', '$location', 'treatmentsService', function ($scope, $location, treatmentsService) {
	$scope.treatment = undefined;
	var id = $location.path().match(/\/treatments\/(.*)/)[1];

	treatmentsService.getTreatment(id).then(function (treatment) {
		$scope.treatment = treatment;
	});
}]);

/** Service Factories **/
treatmentsModule.factory('treatmentsService', ['$http', function ($http) {
	//TODO: use a config objects for all $http calls and implement some better non 200 status code handling
	var TreatmentsService = {
		getTreatments: function () {
			var promise = $http.get('http://localhost/api/treatments').then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
			});
			return promise;
		},
		getTreatment: function (id) {
			var promise = $http.get('http://localhost/api/treatments/' + id).then(function (response) {
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
	return TreatmentsService;
}]);
