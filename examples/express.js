console.log('');
console.log('');
console.log('');
console.log('started: ' + new Date());

var app     = require('express')();
var colors  = require('colors');
var server  = require('http').createServer(app).listen(5000);

var InstagramStream = require('../libs/InstagramStream.js');
var secrets = require('./secrets.json');


var stream = InstagramStream(
  server,
  {
    client_id     : secrets.client_id,
    client_secret : secrets.client_secret,
    url           : secrets.url,
    callback_path : 'callback'
  }
);

stream.on('unsubscribe', function (req, resp) {
  console.log('unsubscribe'.green);
  stream.subscribe({ tag : 'yolo' });
});

stream.on('unsubscribe/error', function (error, req, resp) {
  console.log('unsubscribe/error'.red);
});

stream.on('subscribe', function (req, resp) {
  console.log('subscribe'.green);
});

stream.on('subscribe/error', function (error, req, resp) {
  console.log('subscribe/error'.red);
});

stream.on('new', function (req, resp) {
  console.log('rainbow'.rainbow);
});

app.get('/', function (req, resp) {
  resp.end('___');
});

stream.unsubscribe('all');