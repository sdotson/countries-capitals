angular.module('countriesList',['ngRoute','countries'])
	.config(config)
	.controller('CountriesCtrl', CountriesCtrl);

config.$inject = ["$routeProvider"];
function config($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl: 'countries-list/countries-list.html',
		controller: CountriesCtrl,
		resolve: {
			countries: function(countriesService) {
				return countriesService.countries;
			}
		}
	});
}

CountriesCtrl.$inject = ['$scope','countries'];
function CountriesCtrl($scope, countries) {
	$scope.countries = countries;
};