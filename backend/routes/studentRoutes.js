const express = require('express');
// importing our controller
const studentController = require('../controllers/studentController');

const router = express.Router();

// ROUTES

// Aggregation Route
    //Aggre Route 1
router.route('/student-stats/:branch')
.get(studentController.getStudentStats); 
    //Aggre Route 2
router.route('/student-stats-by-subject/:branch/:subject')
.get(studentController.getStudentStatsBySubject); 

// Search Multiple by rollNo route
router.route('/searchmulti?')
.get(studentController.getMulti);

// BAsic CRUD routes
router.route('/')
.get(studentController.getAllStudents)
.post(studentController.createStudent)
.delete(studentController.deleteAll); 

router.route('/:id')
.get(studentController.getStudent)
.patch(studentController.updateStudent)
.delete(studentController.deleteStudent);

// exporting our router
module.exports = router;