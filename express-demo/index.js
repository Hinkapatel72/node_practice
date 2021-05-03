const startupdebugger = require('debug')('app:startup'); // this requirefunction returns a function so call this function and give it to the arguments
const dbdebugger = require('debug')('app:db'); // seprate for database debugging
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi'); // this module returns class & it use to validate the input and return proper error message
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();  // this express function returns object of type express

app.set('view engine', 'pug'); //when we set this express will internally load pug module so we don't need require here for pug
app.set('views', './views'); //override the path to your template

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`App: ${app.get('env')}`);

app.use(express.json()); // express.json is a Middleware function. It reads the request and if there is a json object in a body
                        // then it will parse the body of the request into a json object then it will set req.body property.

// if we have a html form with input fields and post that form to the server and body of request will look like key=value&key=value
app.use(express.urlencoded({ extended: true })); //parses incoming request with url encoded payloads. (request to body like this key=value&key=value)
// with this Middleware we can serve static content. Run this like: http://localhost:3000/readme.txt
app.use(express.static('public')); //we are going to put all our static assets like css, images inside this public folder.
app.use(helmet());
app.use('/api/courses', courses); // Here we are telling express that for any routes that start with /api/courses use course router.
app.use('/', home);

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupdebugger('Morgan enable...');
}

app.use(logger); //custom Middleware function in a seprate module, import here by calling app.use

/*app.use(function(req, res, next){
  console.log('Logging...');
  next(); // if we won't pass this Middlewareto another one then it will be hangging
});*/


// port is dynamically assigned by the hosting environment so we can't rely on 3000 to be available.
// we can globally set the environment
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
