angular.module('countryDetail',['ngRoute','countries'])
	.config(config)
	.controller(DetailCtrl);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
	$routeProvider.when('/countries/:country/:capital', {
		templateUrl: 'country-detail/country-detail.html',
		controller: DetailCtrl,
		resolve: {
			countryName: function($route) {
				return $route.current.params.country;
			},
			country2: function(countriesService, $route) {
				return countriesService.getCountry($route.current.params.country);
			},
			countries: function(countriesService) {
				return countriesService.getCountries();
			},
			capital: function($route, countriesService) {
				return countriesService.getCapital($route.current.params.capital);
			},
			/*neighbors: function($route, countriesService) {
				console.log('country: ' + countriesService.currentCountry);
				return countriesService.getNeighbors(countriesService.currentCountry.countryCode);
			},*/
		}
	})
}

/*countryController.$inject = [''];*/
function DetailCtrl($scope, countries, capital, country2) {
	$scope.country = countriesService.currentCountry;
	$scope.capital = capital;
	console.log(country2);
}