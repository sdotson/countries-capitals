angular.module('countryDetail',['ngRoute','countries'])
	.config(config)
	.controller(DetailCtrl);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
	$routeProvider.when('/countries/:country/:capital', {
		templateUrl: 'country-detail/country-detail.html',
		controller: DetailCtrl,
		resolve: {
			country: function(countriesService, $route) {
				return countriesService.getCountry($route.current.params.country);
			},
			capital: function($route, countriesService) {
				return countriesService.getCapital($route.current.params.capital);
			},
			neighbors: function($route, countriesService) {
				console.log('country: ' + countriesService.currentCountry);
				return countriesService.getNeighbors(countriesService.currentCountry.countryCode);
			},
		}
	})
}

/*countryController.$inject = [''];*/
function DetailCtrl($scope, capital, country, neighbors) {
	$scope.country = countriesService.currentCountry;
	$scope.capital = capital;
	$scope.neighbors = neighbors;
}