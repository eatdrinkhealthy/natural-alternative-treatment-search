'use strict';

var app = angular.module('app', ['treatmentsModule', 'resourcesModule', 'practitionersModule', 'clinicsModule', 'cancerDietsModule']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	// HTML5 mode
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');

	/** Routes **/
	$routeProvider.when('/', {
		templateUrl: '/app/common/main.html',
		controller: 'mockController',
		resolve: {

		}
	});

	$routeProvider.when('/about', {
		templateUrl: '/app/common/about.html',
		controller: 'mockController',
		resolve: {

		}
	});

	$routeProvider.when('/contact-us', {
		templateUrl: '/app/common/contact-us.html',
		controller: 'mockController',
		resolve: {

		}
	});

	$routeProvider.when('/disclaimer', {
		templateUrl: '/app/common/disclaimer.html',
		controller: 'mockController',
		resolve: {

		}
	});

	$routeProvider.when('/privacy-policy', {
		templateUrl: '/app/common/privacy-policy.html',
		controller: 'mockController',
		resolve: {

		}
	});

	$routeProvider.when('/site-map', {
		templateUrl: '/app/common/site-map.html',
		controller: 'mockController',
		resolve: {

		}
	});

	$routeProvider.when('/terms-of-use', {
		templateUrl: '/app/common/terms-of-use.html',
		controller: 'mockController',
		resolve: {

		}
	});

	$routeProvider.when('/treatments', {
		templateUrl: '/app/treatments/partials/treatments.html',
		controller: 'treatmentsController',
		resolve: {

		}
	});

	$routeProvider.when('/treatments/:id', {
		templateUrl: '/app/treatments/partials/treatment.html',
		controller: 'treatmentController',
		resolve: {

		}
	});

	$routeProvider.when('/clinics', {
		templateUrl: '/app/clinics/partials/clinics.html',
		controller: 'clinicsController',
		resolve: {

		}
	});

	$routeProvider.when('/clinics/:id', {
		templateUrl: '/app/clinics/partials/clinic.html',
		controller: 'clinicController',
		resolve: {

		}
	});

	$routeProvider.when('/practitioners', {
		templateUrl: '/app/practitioners/partials/practitioners.html',
		controller: 'practitionersController',
		resolve: {

		}
	});


	$routeProvider.when('/practitioners/:id', {
		templateUrl: '/app/practitioners/partials/practitioner.html',
		controller: 'practitionerController',
		resolve: {

		}
	});

	$routeProvider.when('/resources', {
		templateUrl: '/app/resources/partials/resources.html',
		controller: 'resourcesController',
		resolve: {

		}
	});

	$routeProvider.when('/resources/:id', {
		templateUrl: '/app/resources/partials/resource.html',
		controller: 'resourceController',
		resolve: {

		}
	});

	$routeProvider.when('/cancer-diets', {
		templateUrl: '/app/cancer-diets/partials/cancer-diets.html',
		controller: 'cancerDietsController',
		resolve: {

		}
	});

	$routeProvider.when('/cancer-diets/:id', {
		templateUrl: '/app/cancer-diets/partials/cancer-diet.html',
		controller: 'cancerDietController',
		resolve: {

		}
	});

	$routeProvider.otherwise('/');

}]);

app.controller('mockController', ['$scope', '$location', function ($scope, $location) {
}]);