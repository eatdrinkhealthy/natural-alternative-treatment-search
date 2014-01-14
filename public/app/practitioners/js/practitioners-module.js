'use strict';

var practitionersModule = angular.module('practitionersModule', []);

/** Controllers **/
practitionersModule.controller('practitionersController', ['$scope', '$location', 'practitionersService', function ($scope, $location, practitionersService) {
    $scope.practitioners = undefined;
    practitionersService.getPractitioners().then(function(practitioners){
        $scope.practitioners = practitioners;
    });

}]);

/** Service Factories **/
practitionersModule.factory('practitionersService', ['$http', function ($http) {
    //TODO: use a config objects for all $http calls and implement some better non 200 status code handling
    var PractitionersService = {
        getPractitioners: function () {
            var promise = $http.get('http://localhost/api/practitioners').then(function (response) {
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
            var promise = $http.get('http://localhost/api/practitioners/' + id).then(function (response) {
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
    return PractitionersService;
}]);