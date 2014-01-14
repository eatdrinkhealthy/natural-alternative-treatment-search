'use strict';

var app = angular.module('app', ['treatmentsModule', 'resourcesModule', 'practitionersModule', 'clinicsModule', 'cancerDietsModule']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // HTML5 mode
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    /** Routes **/
    $routeProvider.when('/', {
        templateUrl: '/static/main.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/about', {
        templateUrl: '/static/about.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/contact-us', {
        templateUrl: '/static/contact-us.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/disclaimer', {
        templateUrl: '/static/disclaimer.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/privacy-policy', {
        templateUrl: '/static/privacy-policy.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/site-map', {
        templateUrl: '/static/site-map.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/terms-of-use', {
        templateUrl: '/static/terms-of-use.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/treatments', {
        templateUrl: '/static/treatments.html',
        controller: 'treatmentsController',
        resolve: {

        }
    });

    $routeProvider.when('/treatments/:id', {
        templateUrl: '/static/treatment.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/clinics', {
        templateUrl: '/static/clinics.html',
        controller: 'clinicsController',
        resolve: {

        }
    });

    $routeProvider.when('/clinics/:id', {
        templateUrl: '/static/clinic.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/practitioners', {
        templateUrl: '/static/practitioners.html',
        controller: 'practitionersController',
        resolve: {

        }
    });


    $routeProvider.when('/practitioners/:id', {
        templateUrl: '/static/practitioner.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/resources', {
        templateUrl: '/static/resources.html',
        controller: 'resourcesController',
        resolve: {

        }
    });

    $routeProvider.when('/resources/:id', {
        templateUrl: '/static/resource.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.when('/cancer-diets', {
        templateUrl: '/static/cancer-diets.html',
        controller: 'cancerDietsController',
        resolve: {

        }
    });

    $routeProvider.when('/cancer-diets/:id', {
        templateUrl: '/static/cancer-diet.html',
        controller: 'mockController',
        resolve: {

        }
    });

    $routeProvider.otherwise('/');

}]);

app.controller('mockController', ['$scope', '$location', function ($scope, $location) {
}]);