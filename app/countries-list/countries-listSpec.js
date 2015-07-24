describe("countriesList", function() {
  beforeEach(module("countriesList"));

  describe("/countries route", function() {
    it('should load the template',
    inject(function($location, $rootScope, $httpBackend, $route, countriesService) {
      $httpBackend.whenGET('countries-list/countries-list.html').respond('...');
      $httpBackend.expectGET('http://api.geonames.org/countryInfo?type=JSON&username=sdotson2015').respond({});

      $rootScope.$apply(function() {
        $location.path('/countries');
      });

      expect($route.current.controller).toBe("CountriesCtrl");
      expect($route.current.loadedTemplateUrl).toBe("countries-list/countries-list.html");

      $httpBackend.verifyNoOutstandingExpectation();
    }));
  });
});