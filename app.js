
//app stuff
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){



  //myo stuff inside the connection
var Myo = require('myo');  
  var message='dickbutt';
  Myo.onError = function () {  
    console.log("Woah, couldn't connect to Myo Connect");
    message="Woah, couldn't connect to Myo Connect";
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

      socket.emit('chat message', message);

    })

    myo.on('fingers_spread', function(){
      console.log('spreadin yer mum');

      message="spreadin yer mum";

      socket.emit('chat message', message);
    })

    myo.on('wave_in', function(){
      console.log('spreadin yer mum');

      message="in ye go";

      socket.emit('chat message', message);
    })

    myo.on('wave_out', function(){
      console.log('spreadin yer mum');

      message="out ye com";

      socket.emit('chat message', message);
    })
  }

  Myo.connect();

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});