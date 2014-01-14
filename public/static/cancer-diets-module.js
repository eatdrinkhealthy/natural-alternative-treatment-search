'use strict';

var cancerDietsModule = angular.module('cancerDietsModule', []);

/** Controllers **/
cancerDietsModule.controller('cancerDietsController', ['$scope', '$location', 'cancerDietsService', function ($scope, $location, cancerDietsService) {
    $scope.cancerDiets = undefined;
    cancerDietsService.getCancerDiets().then(function(cancerDiets){
        $scope.cancerDiets = cancerDiets;
    });

}]);

/** Service Factories **/
cancerDietsModule.factory('cancerDietsService', ['$http', function ($http) {
    //TODO: use a config objects for all $http calls and implement some better non 200 status code handling
    var CancerDietsService = {
        getCancerDiets: function () {
            var promise = $http.get('http://localhost/api/cancer-diets').then(function (response) {
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
            var promise = $http.get('http://localhost/api/cancer-diets/' + id).then(function (response) {
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