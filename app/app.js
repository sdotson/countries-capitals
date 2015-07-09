angular.module('countriesApp',['countriesList','countryDetail','home'])
	.run(function($rootScope) {
		$rootScope.$on('$routeChangeStart', function() {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.isLoading = false;
    });
	});