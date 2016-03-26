
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
  var message='Hello world..?';
  Myo.onError = function () {
    console.log("Woah, couldn't connect to Myo Connect");
    message="Woah, couldn't connect to Myo Connect";
  }

  Myo.on('connected', function(){
    console.log("connectededed");

    message="connected";
    myMyo = this;

    addEvents(myMyo);
  });

  var addEvents = function(myo){

    myo.on('fist', function(){
      console.log('fist');
      message="fist";

      socket.emit('chat message', message);

    })

    myo.on('fingers_spread', function(){
      console.log('spread');

      message="spread";

      socket.emit('chat message', message);
    })

    myo.on('wave_in', function(){
      console.log('in');

      message="in ye go";

      socket.emit('chat message', message);
    })

    myo.on('wave_out', function(){
      console.log('out');

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
