// Import the express
const express = require('express');
// Initialize the app
const app = express();

// Routes which should handle request
const userRoutes = require('./api/routes/userRoute');
const eventRoutes = require('./api/routes/eventRoute');

// A middleware handling http request and response
const morgan = require('morgan');

// Import the body-parser
const bodyParser = require('body-parser');

// Import the mongoDB
const mongoose = require('mongoose');
mongoose.connect(
    // Change to public database
    'mongodb+srv://pigeon:p@pigeon6150@cluster0-ivalg.mongodb.net/test?retryWrites=true',
    {
        dbName: 'finaltemp',
        useNewUrlParser: true
    });

// Concise output colored by response status for development use.
// Its format will be: :method :url :status :response-time ms - :res[content-length]
// Reference:  https://expressjs.com/en/resources/middleware/morgan.html
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// pass middleware
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    // Pass the error along with it
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        err:{
            message: err.message
        }
    });
});

module.exports = app;