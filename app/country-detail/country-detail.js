angular.module('countryDetail',['ngRoute'])
	.config(config)
	.controller(countryController);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
	$routeProvider.when('/country', {
		templateUrl: 'country-detail/country-detail.html',
		controller: countryController
	})
}

countryController.$inject = [''];
function countryController() {
	
}