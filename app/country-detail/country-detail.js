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
			countries: function(countriesService) {
				return countriesService.countries;
			},
			capital: function($route) {
				return $route.current.params.capital;
			}
		}
	})
}

/*countryController.$inject = [''];*/
function DetailCtrl($scope, $filter, countryName, countries) {
	console.log(countriesService.currentCountry);
	$scope.country = countriesService.currentCountry;
}