var app = angular.module('myApp', ['vr.directives.slider'])
.controller('MainCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.cx = "5";
  $scope.circles=[5,10,15,20,25];
  $scope.datasets = [
  	{name:"Select MDG Goal", src:''},
  	{name:'Population Below $1 a day', src:'goal1target1aa.json'},
    {name:'Poverty Gap Ration at $1 a day', src:'goal1target1ab.json'},
    {name:"Poorest Quintile's Share in National Income", src:'goal1target1ac.json'},
    {name:'Growth Rate of GDP per Employed Person', src:'goal1target1ba.json'},
    {name:'Employment to Population Ration', src:'goal1target1bb.json'},
    {name:'Proportion of Employed People Below Poverty Line', src:'goal1target1bc.json'},
    {name:'Proportion of Own Account and Contributing Family Workers in Total Employment', src:'goal1target1bd.json'},
  	{name:'Children Under 5 Moderately or Severly Underweight', src:'goal1target1ca.json'},
    {name:'Population Undernourished', src:'goal1target1cb.json'},
    {name:'Total Net Enrolment Ratio in Primary Education', src:'goal2target2aa.json'},
    {name:'Percent of Pupils Starting Grade 1 who Reach Last Grade of Primary', src:'goal2target2ab.json'},
    {name:'Literacy Rates of 15-24 year olds', src:'goal2target2ac.json'},
    {name:'Gender Parity Index in Primary Level Enrolment', src:'goal3target3aa.json'},
    {name:'Gender Parity Index in Secondary Level Enrolment', src:'goal3target3ab.json'},
    {name:'Gender Parity Index in Tertiary Level Enrolment', src:'goal3target3ac.json'},
    {name:'Share of Women in Wage Employment in the Non-Agricultural Sector', src:'goal3target3ad.json'},
    {name:'Seats Held By Women in National Parliament', src:'goal3target3ae.json'},
    {name:'Children Under 5 Mortality per 1,000 Live Births', src:'goal4target4aa.json'},
    {name:'Infant (0-1) Mortality per 1,000 Live Births', src:'goal4target4ab.json'},
    {name:'Children 1 Year Old Immunizated Against Measles', src:'goal4target4ac.json'},
    {name:'Maternal Mortality Ratio Per 100,000 Live Births', src:'goal5target5aa.json'},
    {name:'Births Attended By Skilled Health Personell', src:'goal5target5ab.json'},
    {name:'Contraceptive Use Among Married Women 15-49 Years Old', src:'goal5target5ba.json'},
    {name:'Adolescent Birth Rate per 1,000 Women', src:'goal5target5ba.json'},
    ];

  $scope.targetDataset = $scope.datasets[0];
  $scope.startingYear = null;
  $scope.endingYear = null;

  $scope.play = function() {
    console.log("play");
    $scope.year = $scope.startingYear;
    var count = 0;
    for (var i = $scope.startingYear; i <= $scope.endingYear; i++) {
      count++;
      $scope.setDelay(count);
    }
  };

  $scope.setDelay = function(count) {
    $timeout(function() {
      $scope.year++;
    }, count*100);
  }
  


}])
