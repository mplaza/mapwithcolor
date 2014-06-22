var app = angular.module('myApp', ['vr.directives.slider'])
.controller('MainCtrl', ['$scope', function($scope) {
  $scope.cx = "5";
  $scope.circles=[5,10,15,20,25];
  $scope.datasets = [
  	{name:"Select MDG Goal", src:''},
  	{name:'A', src:'goal1target1aa.json'},
  	{name:'B', src:'goal6target6aa.json'}
  ];
  $scope.targetDataset = $scope.datasets[0];
  $scope.startingYear = null;
  $scope.endingYear = null;

  $scope.$watch('radius', function() {
		console.log("hello");
	}) 
}])
