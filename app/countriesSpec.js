describe('countriesService', function(countries) {
  var countriesService,
    $httpBackend,
    countriesURL = 'http://api.geonames.org/countryInfo?type=JSON&username=sdotson2015',
    capitalURL = 'http://api.geonames.org/searchJSON?q=Brussels&username=sdotson2015',
    neighborsURL = 'http://api.geonames.org/neighboursJSON?country=BE&username=sdotson2015';

	beforeEach(module('countries'));

  beforeEach(inject(function($injector)  {
    countriesService = $injector.get('countriesService');
    $httpBackend = $injector.get('$httpBackend');

    jasmine.getJSONFixtures().fixturesPath = 'base/mocks';

    $httpBackend.whenGET(countriesURL)
      .respond(
        getJSONFixture('countries.json')
      );

    $httpBackend.whenGET(capitalURL)
      .respond(
        getJSONFixture('capital.json')
      );

    $httpBackend.whenGET(neighborsURL)
      .respond(
        getJSONFixture('neighbors.json')
      );

  }));

  it('should exist', function() {
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

  it('should return capital population and country object', function() {
    $httpBackend.expectGET(capitalURL);

    countriesService.currentCountry = {};

    countriesService.getCapital('Brussels');
    $httpBackend.flush();

    expect(countriesService.currentCountry.capital).toEqual('Brussels');
    expect(countriesService.currentCountry.capitalPopulation).toEqual(1019022);
  });

  it('should return neighbor objects', function() {
    $httpBackend.expectGET(neighborsURL);

    countriesService.currentCountry = {};
    countriesService.getNeighbors('BE');
    $httpBackend.flush();

    expect(countriesService.currentCountry.neighbors[0].countryName).toEqual('France');

  });

  it('should return country details', function() {
    countriesService.getCountryDetails('Belgium', 'Brussels');
    $httpBackend.flush();
    
    expect(countriesService.currentCountry.countryName).toEqual('Belgium');
    countriesService.getCountry('asdfsdf');
    expect(countriesService.currentCountry).toEqual(-1);

  });
  

});