const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const studentRouter = require('./routes/studentRoutes');

const app = express();

/////// Util middlewares /////////
app.use(cors());

app.use(express.json()); //midware that helps to req and res json type data
// built-in middleware to serve static files
//app.use(express.static('./public'));

//using third party middleware - morgan -> for logging route hits
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
  
/////////////////////////////////

//////// CUSTOM MIDDLEWARES ///////////////////
app.use((req,res,next)=>{
    console.log("hello from Middleware!...");
    next();
})

app.use((req,res,next)=>{ //used in getAllTours routehandler
    req.requestTime = new Date().toISOString();
    next();
})

/////////////// ROUTES middlewares /////////////////
app.use('/api/v1/students', studentRouter);


//////////// Start/listen to the server ////////////////
// exporting app.js(expressJS related stuff) file
// so that server.js file can import and use it
module.exports = app;