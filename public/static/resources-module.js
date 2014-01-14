'use strict';

var resourcesModule = angular.module('resourcesModule', []);

/** Controllers **/
resourcesModule.controller('resourcesController', ['$scope', '$location', 'resourcesService', function ($scope, $location, resourcesService) {
    $scope.resources = undefined;
    resourcesService.getResources().then(function(resources){
        $scope.resources = resources;
    });

}]);

/** Service Factories **/
resourcesModule.factory('resourcesService', ['$http', function ($http) {
    //TODO: use a config objects for all $http calls and implement some better non 200 status code handling
    var ResourcesService = {
        getResources: function () {
            var promise = $http.get('http://localhost/api/resources').then(function (response) {
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
            var promise = $http.get('http://localhost/api/resources/' + id).then(function (response) {
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