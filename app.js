
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
  var isfist=false;
  var isvertical=false;
  var isshield=false;
  var test;

  Myo.onError = function () {  
    console.log("Woah, couldn't connect to Myo Connect");
    message="Woah, couldn't connect to Myo Connect";
  }

  Myo.on('connected', function(){  
    console.log("connected");

    message="connected";
    myMyo = this;
    Myo.setLockingPolicy("none");
    addEvents(myMyo);

    socket.emit('shield', isvertical&&isshield);
    console.log(isvertical&&isshield);
  });

  var addEvents = function(myo){  
    myo.on('fist', function(){
      console.log('fist');
      message="fist";
      isfist=true;
      socket.emit('raw data', message);

    })

    myo.on('pose_off', function(fist_off){
      console.log('fist off');
      isfist=false;
      socket.emit('raw data', "fist off");
    })

    myo.on('imu', function(data){
      if(data.accelerometer.x < -0.85)
        isvertical=true;
      else
        isvertical=false;

      
      //console.log(isvertical);
      message="orientation: w x y z:" +"<br> " + Math.round(data.orientation.w*1000)/1000
                                      + "<br> " + Math.round(data.orientation.x*1000)/1000
                                      + "<br> " + Math.round(data.orientation.y*1000) /1000
                                      + "<br> " + Math.round(data.orientation.z*1000)/1000;

      message+="<br>gyroscope: x y z:" +"<br> " + Math.round(data.gyroscope.x*1000)/1000
                                  +"<br> " + Math.round(data.gyroscope.y*1000)/1000
                                  +"<br> " + Math.round(data.gyroscope.z*1000)/1000;

      message+="<br>accelorometer: x y z:" +"<br> " + Math.round(data.accelerometer.x*1000)/1000
                                 +"<br> " + Math.round(data.accelerometer.y*1000)/1000
                                 +"<br> " + Math.round(data.accelerometer.z*1000)/1000;
      socket.emit('raw data', message);

     // socket.emit('shield', isvertical);
    })    
  }

  Myo.connect();

  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});