var telmateApp = angular.module('telmateApp', []);
		 
telmateApp.controller('messageController', ['$scope', '$http', function($scope, $http) {
  	
  	// Retrieving all messages from server.
	$http.get("telmate/messages")
 	.success(function(response) {		
		$scope.messages = response;		 	
 	});
 	
 	$scope.reply = function(msg) {
	  	$scope.message = "reply:@" + msg.name;		   
  	};
  
  	$scope.renotify = function(msg) {
	  	$scope.message = "renotify:";
  	};
  	
 	$scope.post = function(message) {		
		
      	var msgType = $scope.messageType || "public";
      	
      	/*
      	 * Build a new post message. Ideally,
      	 * the message should be sent and created on back end.
      	 * 
      	 * For this assignment, store it on the client side 
      	 * instead.
      	 */
      	var msg = {
			"inmateId": "1123",
			"message": message,
			"date":"2 secs ago",
			"name":"someone",
			"picture": "images/inmate.png",		
			"type":msgType
		};
			
		$scope.messages.unshift(msg); 			
		$scope.message = "";			         	
	};
		
		
}]);  

telmateApp.controller('sliderController', ['$scope', '$http', function($scope, $http) {
	 
  	/*	  	  	
	$http.get("telmate/slideshow").success(
	 	function(response) {		
		  $scope.images = response;		 	
	 });		 
	*/
	
	/*
	 * Just use static data for now. The data should be retrieved from server.
	 * 
	 * TODO: it seens a scoping issue needs to be handled.
	 */
	$scope.images = [
		{"title":"A weekend in the woods","url":"http://zenandsomething.files.wordpress.com/2014/06/day7-131.jpg?w=356&h=236"},
		{"title":"Boating with friends","url":"http://www.tuppensmarine.com/photos/model/large/77df3056e7a2d6a9fa06f288d69ace8.jpg"},
		{"title":"Boating with friends 2","url":"http://www.tuppensmarine.com/photos/model/large/77df3056e7a2d6a9fa06f288d69ace8.jpg"},
		{"title":"I think those are ducks","url":"http://roadslesstraveled.us/pictures/thumb3968.jpg"}];
   
}]);


telmateApp.controller('appController', ['$scope', function($scope) {
 	  	  
  	/*
  	 * This a helper function for filtering.
  	 */
  	$scope.setMessageType = function(msgType) {
		$scope.messageType= msgType;
		  	
	  	var btnType = msgType || "all";
		  	
		  	// Set button color after it is selected
	  	changeColor("public",'white');
	  	changeColor("all",'white');
	  	changeColor("private",'white');	 	  	
	  	
	  	changeColor(btnType,'gray');
  	}; 
	  		
  	// Hide/show reply and renotify buttons
  	$scope.hout = function(msg) {		   
    	return msg.show = false;
  	};

   	$scope.hin= function(msg) {		  
    	return msg.show = true;
  	};
  	
}]);

telmateApp.directive('slider', function () {
	return {
	    restrict: 'AE',
		replace: true,	
			
		scope:{
			images: '='	
		},
		
	    link: function (scope, elem, attrs) {			    			  
		    scope.currentIndex=0;		
		    
			scope.next=function(){
				if (scope.currentIndex<scope.images.length-1) {
					scope.currentIndex++;							
				}		
			};
			
			scope.prev=function(){
				if (scope.currentIndex>0) {
					scope.currentIndex--;						
				}
			};
			
			scope.$watch('currentIndex',function(){
				scope.images.forEach(function(image){
					image.visible=false;				
				});
				scope.images[scope.currentIndex].visible=true;
				
			});
	
	    },
		templateUrl:'templates/slider.html'
  	};
});
