const mongoose = require("mongoose");
const dotenv = require('dotenv');
// connecting to config.env file 
dotenv.config({path: './config.env'});

const app = require('./app');

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