var app = angular.module('myApp', ['ngResource', 'vr.directives.slider', 'mm.foundation'])
.config(
    ['$httpProvider', function($httpProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;

    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]);

// app.factory('Dataset', ['$resource', function($resource) {
//   return $resource('/fulldataset/1aa/povertyindicatorone',
//     {},
//      {update: { method: 'PATCH'}});
// }]);


app.controller('MainCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
  $scope.cx = "5";
  $scope.circles=[5,10,15,20,25];
  $scope.goals = [
  {number: 1, description: "1: Eradicate extreme poverty and hunger"}, {number: 2, description:"2: Achieve universal primary education"}, {number: 3, description: "3: Promote gender equality and empower women"}, {number: 4, description: "4: Reduce child mortality"}, {number: 5, description: "5: Improve maternal health"}, {number: 6, description: "6: Combat HIV/AIDS, malaria and other diseases"}, {number: 7 , description: "7: Ensure environmental sustainability"}, {number: 8, description: "Develop a global partnership for development"}
    ];
  $scope.datasets = [

  	{name:'Population Below $1 a day', src:'/fulldatasets/1aa.json', color: 'red', dataType: '%', number: 1, target: "Halve, between 1990 and 2015, the proportion of people whose income is less than one dollar a day"},
    {name:'Poverty Gap Ratio at $1 a day', src:'/fulldatasets/1ab.json', color: 'red', dataType: '%', number: 1, target: "Halve, between 1990 and 2015, the proportion of people whose income is less than one dollar a day"},
    {name:"Poorest Quintile's Share in National Income", src:'/fulldatasets/1ac.json', color: 'red', dataType: '%', number: 1, target: "Halve, between 1990 and 2015, the proportion of people whose income is less than one dollar a day"},
    {name:'Growth Rate of GDP per Employed Person', src:'/fulldatasets/1ba.json', color: 'green', dataType: '%', number: 1, target: "Achieve full and productive employment and decent work for all, including women and young people"},
    {name:'Employment to Population Ratio', src:'/fulldatasets/1bb.json', color: 'green', dataType: '%', number: 1, target: "Achieve full and productive employment and decent work for all, including women and young people"},
    {name:'Proportion of Employed People Below Poverty Line', src:'/fulldatasets/1bc.json', color: 'red', dataType: '%', number: 1, target: "Achieve full and productive employment and decent work for all, including women and young people"},
    {name:'Proportion of Own Account and Contributing Family Workers in Total Employment', src:'/fulldatasets/1bd.json', color: 'green', dataType: '%', number: 1, target: "Achieve full and productive employment and decent work for all, including women and young people"},
  	{name:'Children Under 5 Moderately or Severly Underweight', src:'/fulldatasets/1ca.json', color: 'red', dataType: '%', number: 1, target: "Halve, between 1990 and 2015, the proportion of people who suffer from hunger"},
    {name:'Population Undernourished', src:'/fulldatasets/1cb.json', color: 'red', dataType: '%', number: 1, target: "Halve, between 1990 and 2015, the proportion of people who suffer from hunger"},
    {name:'Total Net Enrolment Ratio in Primary Education', src:'/fulldatasets/2aa.json', color: 'green', dataType: '%', number: 2, target: "Ensure that, by 2015, children everywhere, boys and girls alike, will be able to complete a full course of primary schooling"},
    {name:'Pupils Starting Grade 1 who Reach Last Grade of Primary', src:'/fulldatasets/2ab.json', color: 'green', dataType: '%', number: 2, target: "Ensure that, by 2015, children everywhere, boys and girls alike, will be able to complete a full course of primary schooling"},
    {name:'Literacy Rates of 15-24 year olds', src:'/fulldatasets/2ac.json', color: 'green', dataType: '%', number: 2, target: "Ensure that, by 2015, children everywhere, boys and girls alike, will be able to complete a full course of primary schooling"},
    {name:'Gender Parity Index in Primary Level Enrollment', src:'/fulldatasets/3aa.json', color: 'green', dataType: '', number: 3, target: "Eliminate gender disparity in primary and secondary education, preferably by 2005, and in all levels of education no later than 2015"},
    {name:'Gender Parity Index in Secondary Level Enrollment', src:'/fulldatasets/3ab.json', color: 'green', dataType: '', number: 3, target: "Eliminate gender disparity in primary and secondary education, preferably by 2005, and in all levels of education no later than 2015"},
    {name:'Gender Parity Index in Tertiary Level Enrollment', src:'/fulldatasets/3ac.json', color: 'green', dataType: '%', number: 3, target: "Eliminate gender disparity in primary and secondary education, preferably by 2005, and in all levels of education no later than 2015"},
    {name:'Share of Women in Wage Employment in the Non-Agricultural Secrot', src:'/fulldatasets/3ad.json', color: 'green', dataType: '%', number: 3, target: "Eliminate gender disparity in primary and secondary education, preferably by 2005, and in all levels of education no later than 2015"},
    {name:'Seats Held By Women in National Parliament', src:'/fulldatasets/3ae.json', color: 'green', dataType: '%', number: 3, target: "Eliminate gender disparity in primary and secondary education, preferably by 2005, and in all levels of education no later than 2015"},
    {name:'Children Under 5 Mortality per 1,000 Live Births', src:'/fulldatasets/4aa.json', color: 'red', dataType: '', number: 4, target: "Reduce by two-thirds, between 1990 and 2015, the under-five mortality rate"},
    {name:'Infant (0-1) Mortality per 1,000 Live Births', src:'/fulldatasets/4ab.json', color: 'red', dataType: '', number: 4, target: "Reduce by two-thirds, between 1990 and 2015, the under-five mortality rate"},
    {name:'Children 1 Year Old Immunizated Against Measles', src:'/fulldatasets/4ac.json', color: 'green', dataType: '%', number: 4, target: "Reduce by two-thirds, between 1990 and 2015, the under-five mortality rate"},
    {name:'Maternal Mortality Ratio Per 100,000 Live Births', src:'/fulldatasets/5aa.json', color: 'red', dataType: '', number: 5, target: "Reduce by three quarters, between 1990 and 2015, the maternal mortality ratio"},
    {name:'Births Attended By Skilled Health Personell', src:'/fulldatasets/5ab.json', color: 'green', dataType: '%', number: 5, target: "Reduce by three quarters, between 1990 and 2015, the maternal mortality ratio"},
    {name:'Contraceptive Use Among Married Women 15-49 Years Old', src:'/fulldatasets/5ba.json', color: 'green', dataType: '%', number: 5, target: "Achieve, by 2015, universal access to reproductive health"},
    {name:'Adolescent Birth Rate per 1,000 Women', src:'/fulldatasets/5bb.json', color: 'red', dataType: '', number: 5, target: "Achieve, by 2015, universal access to reproductive health"},
    {name:'Antenatal care coverage (at least one visit)', src:'/fulldatasets/5bc.json', color: 'green', dataType: '%', number: 5, target: "Achieve, by 2015, universal access to reproductive health"},
    {name:'Antenatal care coverage (at least four visits)', src:'/fulldatasets/5bd.json', color: 'red', dataType: '%', number: 5, target: "Achieve, by 2015, universal access to reproductive health"},
    {name:'Unmet need for family planning', src:'/fulldatasets/5be.json', color: 'red', dataType: '%', number: 5, target: "Achieve, by 2015, universal access to reproductive health"},
    {name:'HIV prevalence among population aged 15-24 years', src:'/fulldatasets/6aa.json', color: 'red', dataType: '%', number: 6, target: "Have halted by 2015 and begun to reverse the spread of HIV/AIDS"},
    {name:'Condom use at last high-risk sex (women)', src:'/fulldatasets/6ab.json', color: 'red', dataType: '%', number: 6, target: "Have halted by 2015 and begun to reverse the spread of HIV/AIDS"},
    {name:'Condom use at last high-risk sex (men)', src:'/fulldatasets/6ac.json', color: 'red', dataType: '%', number: 6, target: "Have halted by 2015 and begun to reverse the spread of HIV/AIDS"},
    {name:'Population aged 15-24 years with comprehensive knowledge of HIV/AIDS (Men)', src:'/fulldatasets/6ad.json', color: 'red', dataType: '%', number: 6, target: "Have halted by 2015 and begun to reverse the spread of HIV/AIDS"},
    {name:'Population aged 15-24 years with comprehensive knowledge of HIV/AIDS (Women)', src:'/fulldatasets/6ae.json', color: 'red', dataType: '%', number: 6, target: "Have halted by 2015 and begun to reverse the spread of HIV/AIDS"},
    {name:'Ratio of school attendance of orphans to school attendance of non-orphans aged 10-14 years', src:'/fulldatasets/6af.json', color: 'red', dataType: '%', number: 6, target: "Have halted by 2015 and begun to reverse the spread of HIV/AIDS"},
    {name:'Proportion of population with advanced HIV infection with access to antiretroviral drugs', src:'/fulldatasets/6ba.json', color: 'red', dataType: '%', number: 6, target: "Achieve, by 2010, universal access to treatment for HIV/AIDS for all those who need it"},
    {name:'Notified cases of malaria per 100,000 population', src:'/fulldatasets/6ca.json', color: 'red', dataType: '', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Malaria death rate per 100,000 population all ages', src:'/fulldatasets/6cb.json', color: 'red', dataType: '', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Malaria death rate per 100,000 population children 0-4', src:'/fulldatasets/6cc.json', color: 'red', dataType: '', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Proportion of children under 5 sleeping under insecticide-treated bednets', src:'/fulldatasets/6cd.json', color: 'red', dataType: '', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Proportion of children under 5 with fever who are treated with appropriate anti-malarial drugs', src:'/fulldatasets/6ce.json', color: 'red', dataType: '', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Tuberculosis prevalence rate per 100,000 population', src:'/fulldatasets/6cf.json', color: 'red', dataType: '', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Tuberculosis death rate per 100,000 population', src:'/fulldatasets/6cg.json', color: 'red', dataType: '', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Tuberculosis incidence rate per 100,000 population', src:'/fulldatasets/6ch.json', color: 'red', dataType: '', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Tuberculosis detection rate under DOTS', src:'/fulldatasets/6ci.json', color: 'green', dataType: '%', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Tuberculosis treatment rate success under DOTS', src:'/fulldatasets/6cj.json', color: 'green', dataType: '%', number: 6, target: "Have halted by 2015 and begun to reverse the incidence of malaria and other major diseases"},
    {name:'Proportion of land area covered by forest', src:'/fulldatasets/7aa.json', color: 'red', dataType: '%', number: 7, target: "Integrate the principles of sustainable development into country policies and programmes and reverse the loss of environmental resources"},
    {name:'Carbon dioxide emissions (CO2), thousand metric tons', src:'/fulldatasets/7ab.json', color: 'red', dataType: '', number: 7, target: "Integrate the principles of sustainable development into country policies and programmes and reverse the loss of environmental resources"},
    {name:'Carbon dioxide emissions (CO2), metric tons of CO2 per capita', src:'/fulldatasets/7ad.json', color: 'red', dataType: '', number: 7, target: "Integrate the principles of sustainable development into country policies and programmes and reverse the loss of environmental resources"},
    {name:'Carbon dioxide emissions (CO2), kg CO2 per $1 GDP (PPP)', src:'/fulldatasets/7af.json', color: 'red', dataType: '', number: 7, target: "Integrate the principles of sustainable development into country policies and programmes and reverse the loss of environmental resources"},
    {name:'Consumption of all ozone-depleting substances in ODP metric tons', src:'/fulldatasets/7ah.json', color: 'red', dataType: '', number: 7, target: "Integrate the principles of sustainable development into country policies and programmes and reverse the loss of environmental resources"},
    {name:'Proportion of fish stocks within safe biological limits', src:'/fulldatasets/7ai.json', color: 'green', dataType: '%', number: 7, target: "Integrate the principles of sustainable development into country policies and programmes and reverse the loss of environmental resources"},
    {name:'Terrestrial and marine areas protected to total territorial area', src:'/fulldatasets/7ba.json', color: 'green', dataType: '%', number: 7, target: "Reduce biodiversity loss, achieving, by 2010, a significant reduction in the rate of loss"},
    {name:'Proportion of the population using improved drinking water sources', src:'/fulldatasets/7ca.json', color: 'green', dataType: '%', number: 7, target: "Halve, by 2015, the proportion of people without sustainable access to safe drinking water and basic sanitation"},
    {name:'Proportion of the population using improved sanitation facilities', src:'/fulldatasets/7cb.json', color: 'green', dataType: '%', number: 7, target: "Halve, by 2015, the proportion of people without sustainable access to safe drinking water and basic sanitation"},
    {name:'Slum population as percentage of urban', src:'/fulldatasets/7da.json', color: 'red', dataType: '%', number: 7, target: "By 2020, to have achieved a significant improvement in the lives of at least 100 million slum dwellers"},
    {name:'Net ODA as percentage of OECD/DAC donors GNI', src:'/fulldatasets/8aa.json', color: 'red', dataType: '%', number: 8},
    {name:'ODA that is untied', src:'/fulldatasets/8ad.json', color: 'red', dataType: '%', number: 8, target: "Develop further an open, rule-based, predictable, non-discriminatory trading and financial system"},
    {name:'ODA received in landlocked developing countries as a percentage of their GNI', src:'/fulldatasets/8ae.json', color: 'red', dataType: '%', number: 8, target: "Develop further an open, rule-based, predictable, non-discriminatory trading and financial system"},
    {name:'Fixed-telephone subscriptions per 100 inhabitants', src:'/fulldatasets/8fa.json', color: 'green', dataType: '', number: 8, target: " In cooperation with the private sector, make available the benefits of new technologies, especially information and communications"},
    {name:'Mobile-cellular subscriptions per 100 inhabitants', src:'/fulldatasets/8fb.json', color: 'green', dataType: '', number: 8, target: " In cooperation with the private sector, make available the benefits of new technologies, especially information and communications"},
    {name:'Internet users per 100 inhabitants', src:'/fulldatasets/8fc.json', color: 'green', dataType: '', number: 8, target: " In cooperation with the private sector, make available the benefits of new technologies, especially information and communications"}
  ];

  $scope.targetDataset = null;
  $scope.startingYear = null;
  $scope.endingYear = null;
  $scope.extrapolationToggle = false;
  $scope.buttonText = "Play";
  $scope.targetCountry = "";

  $scope.countryList = [];



  $scope.getCountries = function(val) {
    return $http.get('/countries.topo.json', {
      params: {
        Country: val,
      }
    })
      .then(function(targetC){
      // var targetCountries = [];
      console.log(targetC);
      angular.forEach(targetC.data.objects.countries.geometries, function(item){
        console.log(item);
        $scope.countryList.push(item.properties.name);
      });
      console.log(countryList);
    });
  };

  $scope.getCountries();

  $scope.play = function() {
    console.log("play");
    if ($scope.buttonText == "Play") {
      $scope.buttonText = "Pause";
      $scope.year = $scope.startingYear;
      var count = 0;
      $scope.currentTimeout = $timeout($scope.setDelay, 100);
    }
    else if ($scope.buttonText == "Pause") {
      $timeout.cancel($scope.currentTimeout);
      $scope.buttonText = "Play";
    }
  };
   
  $scope.setDelay = function(count) {
    $scope.year++;
    if ($scope.year <= $scope.endingYear) {
      $scope.currentTimeout = $timeout($scope.setDelay, 100);
    }
    else {
       $scope.buttonText = "Play";
    }
  };

  $scope.$watch('extrapolationToggle', function(){
    // change year loaded to map
    $scope.buttonText = "Play";
    $timeout.cancel($scope.currentTimeout);
  }, true);

  $scope.$watch('targetDataset', function(){
    // change year loaded to map
    $scope.buttonText = "Play";
    $timeout.cancel($scope.currentTimeout);
  }, true);
   


}])