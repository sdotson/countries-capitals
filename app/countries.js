angular.module('countries',[])
	.factory('countriesService', countriesService);

countriesService.$inject = ['$http','$filter'];
function countriesService($http, $filter) {
	var countriesService = {
			countries: countries || getCountries(),
			currentCountry: currentCountry,
			getCountry: getCountry
		},
		currentCountry,
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
		return request.then(countriesSuccess,countriesError);
	}

	function countriesSuccess(response) {
		countries = response.data.geonames;
		return countries;
	}

	function countriesError(response) {
		console.log(response);
		return response;
	}

	function getCountry(countryName) {
		countries = countries || getCountries();
		console.log(countries);
		return $filter('filter')(countries, countryName);
	}

	return countriesService;
}