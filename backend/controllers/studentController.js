const Student = require('../models/studentModel');

// STUDENTS ROUTE HANDLERS

// getAll students + get a particular student by rollNo

// GET=> http://localhost:3000/api/v1/students
// search/query single student by rollNo => GET=> http://localhost:3000/api/v1/students?rollNo=3
// search/query multiple students by rollNos separated by comma => GET=> http://localhost:3000/api/v1/students?rollNo=3
exports.getAllStudents = async (req,res) => {
    try{
        // search student based on roll No => GET=> http://localhost:3000/api/v1/students?rollNo=3
        console.log(req.query);
        // BUILD QUERY
        //search single  
        const queryObj = { ...req.query };
        const query = Student.find(queryObj);

        // EXECUTE QUERY  
        const students = await query;

        //const students = await Student.find();
        
        // SENDING RESPONSE
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime, //using custom middleware
            results: students.length, //total nos of results - array of students
            data:{
                students
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}

// get student by id
exports.getStudent = async (req,res)=>{
    try{
        const student = await Student.findById(req.params.id);
        // same as above - mongoose method/function
        // const student = await Student.findOne({ _id: req.params.id });

        res.status(200).json({
            status: 'success',
            data:{
                student
            }
        });
    }catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        });
    }
}

// Search Multiple by Roll nos
// get multiple students by rollnos
exports.getMulti = async (req,res)=>{
    try{
        //checks
        // console.log(req.query);
        // console.log(req.query.rollNos);

        const rolls = req.query.rollNos.split(','); // concerting query obj to array

        // db.students.find({"rollNo" : { "$in" : [ 3,5,7]}}).pretty()
        const students = await Student.find({
            'rollNo' : { $in : rolls }
        });

        res.status(200).json({
            status: 'success',
            results: students.length,
            data:{
                students
            }
        });
    }catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        });
    }
}


// Create a new student
exports.createStudent = async (req,res)=>{
    try{
        // const newStudent = new Student({});
        // newStudent.save();
        //      OR 
        
        const newStudent = await Student.create({
            rollNo: req.body.rollNo,
            name: req.body.name,
            branch: req.body.branch,
            email: req.body.email,
            subjectMarks: [
                {subject: "Maths", marks: req.body.maths},
                {subject: "English", marks: req.body.english},
                {subject: "Science", marks: req.body.science},
            ]
        });

        res.status(201).json({
            status:'success',
            data:{
                student: newStudent
            }
        });
    }catch(err){
        res.status(400).json({
            status:'fail',
            message: err
        });
    }
}
// Update a student
// exports.updateStudent = async (req,res)=>{
//     try{
//         const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true});
        
//         res.status(200).json({
//             status:'success',
//             data: {
//                 student
//             }
//         })
//     }catch(err){
//         res.status(400).json({
//             status:'failed',
//             message: err
//         })
//     }
// }

exports.updateStudent = async (req,res)=>{
    try{
        const student = await Student.findByIdAndUpdate(
            req.params.id, 
            {
                rollNo: req.body.rollNo,
                name: req.body.name,
                branch: req.body.branch,
                email: req.body.email,
                subjectMarks: [
                    {subject: "Maths", marks: req.body.maths},
                    {subject: "English", marks: req.body.english},
                    {subject: "Science", marks: req.body.science},
                ]
            }, 
            {new: true});
        
        res.status(200).json({
            status:'success',
            data: {
                student
            }
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message: err
        })
    }
}

// delete a student 
exports.deleteStudent = async (req,res)=>{
    try{
        await Student.findByIdAndDelete(req.params.id);
        
        res.status(204).json({
            status:'success',
            data: null
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message: err
        })
    }
    
}

// delete all students
exports.deleteAll = async (req, res) =>{
    try{
        await Student.deleteMany({});

        res.status(204).json({
            status:'success',
            data: null
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            message: err
        })
    }
}

// AGGREGATION PIPELINE

// Aggre Function 1
// GET => http://localhost:3000/api/v1/students/student-stats/IoT
// Aggregating top 3 toppers of branch IoT - branch toppers
exports.getStudentStats = async (req, res) => {
    try{

        const branch = req.params.branch; // IoT, FSE, MSE, CCVT, OSOS

        const stats = await Student.aggregate([
            {
                $unwind: '$subjectMarks'
            },
            {
                $match: { branch: branch }
            },
            {
                $group: {
                    _id: { $toUpper: '$name'},
                    totalMarks: { $sum: '$subjectMarks.marks' },
                    outOf: { $sum: 100 }, // +100 => 3 subjs -> 300
                    percentage : { $avg: '$subjectMarks.marks'}
                    
                }
            },
            {
                $sort: { totalMarks: -1 } // -1 for descending order
            },
            {
                $limit: 3
            }
        ]);

        res.status(200).json({
            status: 'Success',
            data:{
                stats
            }
        })

    }catch(err){
        res.status(400).json({
            status:'failed',
            message: err
        })
    }
}

// Aggre Function 2
// GET => http://localhost:3000/api/v1/students/student-stats-by-subject/IoT/Maths
// Aggregating top 3 toppers of branch IoT in maths subject
exports.getStudentStatsBySubject = async (req, res) => {
    try{

        const branch = req.params.branch; // IoT, FSE, MSE, CCVT, OSOS
        const subject = req.params.subject // Maths, English, Science

        const stats = await Student.aggregate([
            {
                $unwind: '$subjectMarks'
            },
            {
                $match: { 
                    branch: branch,
                    "subjectMarks.subject" : subject 
                 }
            },
            {
                $group: { 
                    _id: {
                        name: '$name',
                        branch: branch,
                        subject: '$subjectMarks.subject',
                        marks: '$subjectMarks.marks'
                    } 
                }
            },
            {
                $sort: { _id: -1 } // -1 for descending order
            },
            {
                $limit: 3
            }
        ]);

        res.status(200).json({
            status: 'Success',
            data:{
                stats
            }
        })

    }catch(err){
        res.status(400).json({
            status:'failed',
            message: err
        })
    } 
}
