// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// //var users = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hjs');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(require('less-middleware')(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// //app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });



// module.exports = app;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Myo = require('myo');  
  var message='dickbutt';
  Myo.onError = function () {  
    console.log("Woah, couldn't connect to Myo Connect");
    message="error";
    io.emit('chat message', message);
  }

  Myo.on('connected', function(){  
    console.log("TONY EATS ASS");

    message="connected";
    myMyo = this;

    addEvents(myMyo);
  });

  var addEvents = function(myo){  

    myo.on('fist', function(){
      console.log('fistin yer mum');
      message="fistin yer mum";
    })

    myo.on('fingers_spread', function(){
      console.log('spreadin yer mum');

      message="spreadin yer mum";
    })

    myMyo.streamEMG(true);
    myMyo.on('emg', function(data){
      var datasum=0;
      for(var i =0; i<8; i++){
        datasum+=data[i];
      }
      console.log(datasum);
    });

  }

  Myo.connect();
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});