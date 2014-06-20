var app = angular.module('myApp', ['vr.directives.slider'])
.controller('MainCtrl', ['$scope', function($scope) {
  $scope.cx = "5";
  $scope.circles=[5,10,15,20,25];

  $scope.$watch('radius', function() {
		console.log("hello");
	}) 
}])