const EventEmitter = require("events");

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter{
  log(message) {
    // send an Http Request
    console.log(message);

    //Raise an event
    this.emit('messageLogged', {id: 1, url: 'http://'})
  }
}


//... Exporting a object from a module. Object woulb be useful if we have multiple methods or properties...
//module.exports.log = log;

//... Export with a single(log) function...
module.exports = Logger;
