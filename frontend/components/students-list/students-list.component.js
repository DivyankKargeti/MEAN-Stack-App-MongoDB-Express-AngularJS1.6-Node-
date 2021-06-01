function StudentsListController(mainSvc,$http){
    var vm = this;

    // Get all students and refresh func.
    var refresh = function(){
        mainSvc.getStudents().then(function(response){
            //console.log(response.data.data.students);
            vm.students = response.data.data.students;
            vm.newStudent = {}; //clearing memory
        }).catch((err) => console.log("Error", err) );
    };
    refresh();


    // //For Adding new Student
    // vm.addStudent = function(){
    //     $http.post('http://localhost:4000/api/v1/students',{
    //         rollNo: vm.newStudent.rollNo,
    //         name: vm.newStudent.name,
    //         branch: vm.newStudent.branch,
    //         email: vm.newStudent.email,
    //         maths: vm.newStudent.maths,
    //         english: vm.newStudent.english,
    //         science: vm.newStudent.science
    //     }).then(function(response){
    //         refresh();
    //         //clearing memory
    //         vm.newStudent = {}; 
    //         vm.students = response.data.data.students;
    //     })
    //     .catch((err) => console.log('Error: ' , err));
    //         alert('Student Added Successfully!');
    //     }

    //For Adding new Student
    vm.addStudent = function(){
        mainSvc.postStudent({
            rollNo: vm.newStudent.rollNo,
            name: vm.newStudent.name,
            branch: vm.newStudent.branch,
            email: vm.newStudent.email,
            maths: vm.newStudent.maths,
            english: vm.newStudent.english,
            science: vm.newStudent.science
        }).then(function(response){
            refresh();
            //clearing memory
            vm.newStudent = {}; 
            vm.students = response.data.data.students;
        })
        .catch((err) => console.log('Error: ' , err));
            alert('Student Added Successfully!');
    }

    //Remove Student
    vm.removeStudent = function (id) {
        mainSvc.deleteStudent(id)
          .then(function (response) {
            refresh();
            // vm.students = response.data.data.students;
          })
          .catch((err) => console.log(err));
    };

    //edit student
    vm.editStudent = function (id) {
          mainSvc.editStud(id)
          .then(function (response) {
            vm.upd = true; //show update button
            vm.newStudent = response.data.data.student;
            vm.newStudent.maths = response.data.data.student.subjectMarks[0].marks;
            vm.newStudent.english = response.data.data.student.subjectMarks[1].marks;
            vm.newStudent.science = response.data.data.student.subjectMarks[2].marks;

            // Scroll up to form after edit btn click
            $("body").scrollTop(0); // jquery

          })
          .catch((err) => console.log(err));
    };
  
    //update student
    vm.updateStudent = function (id) {
        mainSvc.updateStud(id,vm.newStudent)
        .then(function (response) {
            refresh();
            vm.upd = false; //hide update button
          })
          .catch((err) => console.log(err));
    };
        

}

app.component('studentsList', {
    templateUrl: 'components/students-list/students-list.html',
    controller: StudentsListController,
    controllerAs: 'vm'
})


