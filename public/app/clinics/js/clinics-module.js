'use strict';

var clinicsModule = angular.module('clinicsModule', []);

/** Controllers **/
clinicsModule.controller('clinicsController', ['$scope', '$location', 'clinicsService', function ($scope, $location, clinicsService) {
    $scope.clinics = undefined;
    clinicsService.getClinics().then(function(clinics){
        $scope.clinics = clinics;
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
        }
    }
    return ClinicsService;
}]);