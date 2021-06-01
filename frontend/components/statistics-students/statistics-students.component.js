function StatisticsStudentsController(mainSvc){
    var vm = this;

    vm.aggreBranch = function(){
        mainSvc.getStatsBranch(vm.branch)
        .then(function(response){
            vm.stats = response.data.data.stats;
        }).catch((err)=> console.log('Error: ', err));
    }

    vm.aggreBranchSubj = function(){
        mainSvc.getStatsBranchSubject(vm.branchname,vm.subject)
        .then(function(response){
            vm.stats2 = response.data.data.stats;
        }).catch((err)=> console.log('Error: ', err));
    }

}

app.component('statisticsStudents', {
    templateUrl: 'components/statistics-students/statistics-students.html',
    controller: StatisticsStudentsController,
    controllerAs: 'vm'
})


