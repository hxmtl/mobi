angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })
    
    .state('eventmenu.attendees', {
      url: "/attendees",
      views: {
        'menuContent' :{
          templateUrl: "templates/attendees.html",
          controller: "AttendeesCtrl"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/event/home");
})


     .controller('ListCtrl', function($scope, $http) {
         $http.get('https://s3.amazonaws.com/howtoapp/DemoData.json').
         success(function(data, headers) {
             $scope.expandedJSON = angular.fromJson(data);
             $scope.todos = [];
             for (var i = 0; i < $scope.expandedJSON.length; i++) {
                 $scope.todos.push(expandJSONObject($scope.expandedJSON[i]));
             }
             console.log($scope.allContacts);
         }).
         error(function(data) {});
    
         var headers = {
             'Content-Type': 'application/javascript',
             'Date': new Date(),
             'Authorization': 'AWS AKIAJJAH6R2UH6J4C45A:GCoFxbBEDsQKqIo2X8lXMAajKjU61oQ0Wo0uDONT',
             'Access-Control-Allow-Origin': 'localhost'
         };

$http.get('https://s3.amazonaws.com/howtoapp/DemoData.json').then(function(resp, headers) {
    console.log('Success', resp);
    $scope.todos = resp.data;

    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })


     })


.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $http) {
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})


.controller('AttendeesCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, '); 
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
});