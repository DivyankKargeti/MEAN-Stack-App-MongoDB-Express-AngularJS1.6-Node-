function SearchStudentsController(mainSvc){
    var vm = this;

    vm.searchSingle = function(){
        mainSvc.searchSingleStudent(vm.rollNo)
        .then(function(response){
            vm.students = response.data.data.students;
        }).catch((err)=> console.log('Error: ', err));
    }

    vm.searchMulti = function(){
        mainSvc.searchMultiStudents(vm.rollNos)
        .then(function(response){
            vm.students = response.data.data.students;
        }).catch((err)=> console.log('Error: ', err));
    }

}

app.component('searchStudents', {
    templateUrl: 'components/search-students/search-students.html',
    controller: SearchStudentsController,
    controllerAs: 'vm'
})


