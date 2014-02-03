'use strict';

var resourcesModule = angular.module('resourcesModule', []);

/** Controllers **/
resourcesModule.controller('resourcesController', ['$scope', '$location', 'resourcesService', function ($scope, $location, resourcesService) {
	$scope.resources = undefined;
	resourcesService.getResources().then(function (resources) {
		$scope.resources = resources;
	});

}]);

resourcesModule.controller('resourceController', ['$scope', '$location', 'resourcesService', function ($scope, $location, resourcesService) {
	$scope.resource = undefined;
	var id = $location.path().match(/\/resources\/(.*)/)[1];

	resourcesService.getResource(id).then(function (resource) {
		$scope.resource = resource;
	});
}]);

/** Service Factories **/
resourcesModule.factory('resourcesService', ['$http', function ($http) {
	//TODO: use a config objects for all $http calls and implement some better non 200 status code handling
	var ResourcesService = {
		getResources: function () {
			var promise = $http.get('/api/resources').then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
			});
			return promise;
		},
		getResource: function (id) {
			var promise = $http.get('/api/resources/' + id).then(function (response) {
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
	return ResourcesService;
}]);