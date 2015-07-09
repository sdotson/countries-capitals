angular.module('countries',[])
	.factory('countriesService', countriesService);

countriesService.$inject = ['$http'];
function countriesService($http) {
	var countriesService = {
			countries: countries || getCountries(),
			getCountries: getCountries
		},
		countries;

	function getCountries() {
		var request = $http({
			url: 'http://api.geonames.org/countryInfo',
			method: 'GET',
			cache: true,
			params: {
				username: 'sdotson2015',
				type: 'JSON'
			}
		});
		return request.then(successHandler,errorHandler);
	}

	function successHandler(response) {
		countries = response.data.geonames;
		return countries;
	}

	function errorHandler(response) {
		console.log(response);
		return response;
	}

	return countriesService;
}