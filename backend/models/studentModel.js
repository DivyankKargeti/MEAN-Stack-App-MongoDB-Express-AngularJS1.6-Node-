const mongoose = require("mongoose");
const validator = require("validator");

// Mongoose Schema
const Marks = new mongoose.Schema({
    subject: String,
    marks: {
        type: Number,
        min:0,
        max:100
    }
});

const studentSchema = new mongoose.Schema({
    rollNo: {
        type: Number,
        required: [true, 'A student must have a Roll no.']
    },
    name: { 
        type:String, 
        trim: true,
        required: [true, 'A student must have a name'],
        maxlength:[40, 'A student name must less than or equal to 40 chars'],
        minlength:[3, 'A student name must have atleast 10 chars']    
    },
    email: {
        type:String, 
        trim: true,
        required: [true, 'A student must have an email'],
    },
    branch: { 
        type:String, 
        trim: true,
        required: [true, 'A student must have a name'],
        minlength:[3, 'A student branch must have atleast 3 chars'],
        maxlength:[15, 'A student branch must less than or equal to 15 chars']
    },
    subjectMarks: [Marks],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

// Mongoose Model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;