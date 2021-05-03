
/*console.log(__filename);
console.log(__dirname);*/

//...Here we are using object of logger function because we are exporting object...
/*const logger = require('./logger');
console.log(logger);
logger.log('message');*/

//...Now the logger is function so we are calling it directly...
/*const logger = require('./logger');
logger('message');*/

//...this way we can get file info including directory...
/*const path = require('path');
const pathObj = path.parse(__filename);
console.log(pathObj);*/

//...this way we can get os info...
/*const os = require('os');
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);*/

//...Synchronous read directory example...
/*const fs = require('fs');
const files = fs.readdirSync('./');
console.log(files);*/

//...Asynchronous read directory example...
/*const fs = require('fs');
fs.readdir('./', function(err, files) {
  if (err) console.log('Error', err);
  else console.log('Result', files);
});*/

//...Events module...
/*const EventEmitter = require('events');
const emitter = new EventEmitter;

// Register a listener
emitter.on('messageLogged', function(arg){
  console.log('Listener Called', arg);
});
// Raise an event
emitter.emit('messageLogged', { id: 1, url: 'http://'});*/

//...Raise an event through class...
/*const EventEmitter = require('events');

const Logger = require('./logger')
const logger = new Logger();

logger.on('messageLogged', function(arg) {
  console.log('Listener Called', arg);
});

logger.log('message');*/

//...Http Module...
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }
  if (req.url === 'api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.on('connection', (socket) => {
  console.log('New connection...');
});

server.listen(3000);

console.log('Listening on port 3000....');
