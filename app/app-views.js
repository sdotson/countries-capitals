angular.module('countriesAppViews',['$routeProvider'])
	.config(config);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	})
	.when('/countries', {
		templateUrl: 'countries-detail/countries-detail.html',
		controller: 'CountriesCtrl'
	});
};