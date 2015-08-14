angular.module('starter.controllers',[])
	.controller('AppController',function($scope, $cordovaLocalNotification) {
	    // creating a new websocket
	    var socket = io.connect('http://192.168.1.217:8000');

		    socket.on('badge', function (data) {
		        $scope.badge = data;
		        $scope.$apply();
		        var time = new Date();	        
		        time.setSeconds(time.getSeconds() + 2);
		        $cordovaLocalNotification.schedule({
		            date: time,
		            message: data,
		            title: "Time",
		            autoCancel: true,
		            sound: null
		        }).then(function () {
		            console.log("The notification has been set");
		        });
		    });
	});