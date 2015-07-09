angular.module('countriesList',['ngRoute','countries'])
	.config(config)
	.controller('CountriesCtrl', CountriesCtrl);

/*config.$inject = ["$routeProvider","countriesService"];*/
function config($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl: 'countries-list/countries-list.html',
		controller: CountriesCtrl,
		resolve: {
			countries: function(countriesService) {
				return countriesService.getCountries();
			}
		}
	});
}

CountriesCtrl.$inject = [];
function CountriesCtrl() {

};