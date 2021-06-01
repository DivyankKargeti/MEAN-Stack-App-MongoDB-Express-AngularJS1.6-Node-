var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: 'views/home.html'
    })
    .state('students',{
      url: '/students',
      template: '<students-list></students-list>'
    })
    .state('search',{
      url: '/search',
      template: '<search-students></search-students>'
    })
    .state('statistics',{
      url: '/statistics',
      template: '<statistics-students></statistics-students>'
    })
})

app.controller('mainCtrl', function (mainSvc,$http){
  var vm = this;
});

// custom filters
app.filter("nameCapital", function () {
  return function (input) {
    return input[0].toUpperCase() + input.slice(1);
  };
});

// Custom Services
app.service('mainSvc',function($http){
  this.getStudents = function(){
    return $http.get('http://localhost:4000/api/v1/students');
  }
  this.postStudent = function(stuData){
    return $http.post('http://localhost:4000/api/v1/students', stuData);
  }
  this.deleteStudent = function(id){
    return $http.delete('http://localhost:4000/api/v1/students/' +id);
  }
  this.editStud = function(id){
    return $http.get('http://localhost:4000/api/v1/students/' +id);
  }
  this.updateStud = function(id, stuData){
    return $http.patch('http://localhost:4000/api/v1/students/' +id, stuData);
  }
  this.searchSingleStudent = function(rollNo){
    // http://localhost:4000/api/v1/students?rollNo=3
    return $http.get('http://localhost:4000/api/v1/students?rollNo=' +rollNo); 
  }
  this.searchMultiStudents = function(rollNos){
    return $http.get('http://localhost:4000/api/v1/students/searchmulti?rollNos=' +rollNos); 
  }
  this.getStatsBranch = function(branch){
    // GET => http://localhost:4000/api/v1/students/student-stats/IoT
    return $http.get('http://localhost:4000/api/v1/students/student-stats/' +branch); 
  }
  this.getStatsBranchSubject = function(branch,subject){
    // GET => http://localhost:3000/api/v1/students/student-stats-by-subject/IoT/Maths
    return $http.get(`http://localhost:4000/api/v1/students/student-stats-by-subject/${branch}/${subject}`); 
  }
})

// factory service
// app.factory('mainSvc',function($http){
//   var getPosts = function(){
//     return $http.get('http://localhost:4000/api/v1/students')
//   }

//   return{
//     getPosts: getPosts
//   }
// })
