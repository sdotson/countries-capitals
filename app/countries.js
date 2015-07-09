angular.module('countries',[])
	.factory('countriesService', countriesService);

countriesService.$inject = ['$http'];
function countriesService($http) {
	var countriesService = {
		getCountries: getCountries
	}

	function getCountries() {
		$http({
			url: 'http://api.geonames.org/countryInfo',
			method: 'GET',
			params: {
				username: 'sdotson2015'
			}
		})
		.success(countriesSuccess)
		.error(countriesError);
	}

	function countriesSuccess(response) {
		console.log(response);
	}

	function countriesError(response) {
		console.log(response);
	}

	return countriesService;
}