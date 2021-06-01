const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const Tour = require('./../../models/studentModel');
// connecting to config.env file 
dotenv.config({path: './config.env'});

const app = require('./../../app');

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(() => console.log('DB Connection Successful!!'));

// PORT Listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port}...`);
}) 

// READ JSON FILES
const tours = JSON.parse(fs.readFileSync(`${__dirname}/import-students.json`, 'utf-8'));

// IMPORT DATA INTO JSON FILES
const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log('Data Successfully loaded!');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

// DELETE ALL DATA FROM DB
const deleteData = async () =>{
    try{
        await Tour.deleteMany();
        console.log('Data Successfully deleted!');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}

// Commands to run thsi scripts
 // To import data
    // node dev-data/data/import-dev-data.js --import
 // To delete all data
   // node dev-data/data/import-dev-data.js --delete