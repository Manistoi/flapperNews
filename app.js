var app = angular.module('flapperNews', ['ui.router']); //create angular module named 'flapperNews' that has a ui.router dependency
app.config([  // use the module's config function to create routes
'$stateProvider',  //used to watch for the state of apps - A state being a "place" in the app in terms of the overall UI and navigation.
'$urlRouterProvider', //watches for the $location
  function($stateProvider, $urlRouterProvider){
    
    $stateProvider
      .state ('home', {
        url: "/home",
        templateUrl: "/home.html",
        controller: 'MainCtrl'
      });
      
    $stateProvider
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      }); 
      
      $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function(){
  var o = {
    posts: [{title: 'hello post1', link: '', upvotes: 0 }]
  };
  return o;
}])

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.test = 'Hello world!';
  
  $scope.posts = posts.posts;
 
 $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'cool post!', upvotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
    });
    $scope.title = '';
    $scope.link = '';
  }
  
  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  }
}]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];
}]);







