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


	$routeProvider.when('/search/:query', {
		templateUrl: '/app/common/search.html',
		controller: 'searchResultsController',
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

	// Admin routes
	$routeProvider.when('/add/clinic', {
		templateUrl: '/app/add-clinic.html',
		controller: 'addClinicController'
	});

	$routeProvider.when('/add/practitioner', {
		templateUrl: '/app/add-practitioner.html',
		controller: 'addPractitionerController'
	});

	$routeProvider.otherwise('/');

}]);

app.controller('mockController', ['$scope', '$location', function ($scope, $location) {
	$scope.stage = '';
	$scope.cancerType = '';

	$scope.isValid = function () {
		if ($scope.stage.length > 0 && $scope.cancerType.length > 0) {
			return false;
		}
		return true;
	}

	$scope.search = function (stage, cancerType) {
		$location.path('/search/stage=' + stage.toLowerCase() + '&cancer_type=' + cancerType.toLowerCase());

	};

}]);

app.controller('searchResultsController', ['$scope', '$location', 'searchService', function ($scope, $location, searchService) {

	var query = $location.path().match(/\/search\/(.*)/)[1];
	$scope.stage = query.split('&')[0].split('=')[1];
	$scope.cancerType = query.split('&')[1].split('=')[1];

	$scope.results = undefined;
	$scope.hasResults = false;
	$scope.hasNoResults = false;

	searchService.searchAll(query).then(function (data) {
		if (data.length > 0) {
			$scope.results = data;
			$scope.hasResults = true;
		} else {
			$scope.hasNoResults = true;
		}

	});
}]);

app.controller('addClinicController', ['$scope', '$location', 'clinicsService', function ($scope, $location, clinicsService) {
	$scope.clinic = {
		treatment_type: [],
		stage: [],
		cancer_type: []
	};

	$scope.stage = undefined;
	$scope.cancerType = undefined;
	$scope.treatmentType = undefined;

	$scope.addStage = function () {
		$scope.clinic.stage.push($scope.stage);
		$scope.stage = undefined;
	}

	$scope.addTreatmentType = function () {
		$scope.clinic.treatment_type.push($scope.treatmentType);
		$scope.treatmentType = undefined;
	}

	$scope.addCancerType = function () {
		$scope.clinic.cancer_type.push($scope.cancerType);
		$scope.cancerType = undefined;
	}

	$scope.save = function () {
		clinicsService.addClinic($scope.clinic).then(function (data) {
			$location.path('/clinics');
		});
	}

}]);


app.controller('addPractitionerController', ['$scope', '$location', 'practitionersService', function ($scope, $location, practitionersService) {
	$scope.practitioner = {
		treatment_type: [],
		stage: [],
		cancer_type: []
	};

	$scope.stage = undefined;
	$scope.cancerType = undefined;
	$scope.treatmentType = undefined;

	$scope.addStage = function () {
		$scope.practitioner.stage.push($scope.stage);
		$scope.stage = undefined;
	}

	$scope.addTreatmentType = function () {
		$scope.practitioner.treatment_type.push($scope.treatmentType);
		$scope.treatmentType = undefined;
	}

	$scope.addCancerType = function () {
		$scope.practitioner.cancer_type.push($scope.cancerType);
		$scope.cancerType = undefined;
	}

	$scope.save = function () {
		practitionersService.addPractitioner($scope.practitioner).then(function (data) {
			$location.path('/practitioners');
		});
	}

}]);

app.factory('searchService', ['$http', function ($http) {
	var SearchService = {
		searchAll: function (query) {
			var promise = $http.get('/api/search?' + query).then(function (response) {
				if (response.status === 200) {
					return response.data;
				} else {
					window.alert(response.data.message);
					return response.data
				}
			});
			return promise;
		}
	}
	return SearchService;
}]);