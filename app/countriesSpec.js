describe('countriesService', function(countries) {
  var countriesService,
    $httpBackend,
    countriesURL = 'http://api.geonames.org/countryInfo?type=JSON&username=sdotson2015';

	beforeEach(module('countries'));

  beforeEach(inject(function($injector)  {
    countriesService = $injector.get('countriesService');
    $httpBackend = $injector.get('$httpBackend');

    jasmine.getJSONFixtures().fixturesPath = 'base/mocks';

    $httpBackend.whenGET(countriesURL)
      .respond(
        getJSONFixture('countries.json')
      );

  }));

  it('should have countries service', function() {
    expect(countriesService).toBeDefined();
  });

  it('should return list of countries', function() {
    $httpBackend.expectGET(countriesURL);

    countriesService.getCountries();
    $httpBackend.flush();
    expect(countriesService.countries.length).toBeGreaterThan(0);
    expect(countriesService.countries.length).toEqual(250);
  });

  it('should return country object', function() {
    $httpBackend.expectGET(countriesURL);

    countriesService.getCountries();
    $httpBackend.flush();
    countriesService.getCountry('France');
    expect(countriesService.currentCountry.countryName).toEqual('France');
    countriesService.getCountry('asdfsdf');
    expect(countriesService.currentCountry).toEqual(-1);

  });


  /*it('getCountry returns object', inject(function (countriesService, $q, $http) {
   countriesService.countries = [{
      countryName: 'France',
      capital: 'Paris'
    }];

    console.log(countriesService.getCountry);

    countriesService.getCountry('France').then(function(data) {
      assert.isObject(data);
    });
  }));*/

  /*it('getCapital returns object', inject(function (countriesService, $q, $http) {
    countriesService.getCapital('Paris').then(function(data) {
      console.log(data);
      assert.isObject(data);
    });
  }));

  it('getNeighbors returns object', inject(function (countriesService, $q, $http) {
    countriesService.getNeighbors().then(function(data) {
      console.log(data);
      assert.isObject(data);
    });
  }));

  it('getCountryDetails returns object', inject(function (countriesService, $q, $http) {
    countriesService.getCountryDetails().then(function(data) {
      console.log(data);
      assert.isObject(data);
    });
  }));*/

});