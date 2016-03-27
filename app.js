
//app stuff
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/public/javascripts/three.min.js', function(req, res){
  res.sendFile(__dirname + '/public/javascripts/three.min.js');
});

app.get('/threeRender.js', function(req, res){
  res.sendFile(__dirname + '/threeRender.js');
});

io.on('connection', function(socket){

  //myo stuff inside the connection
  var Myo = require('myo');
  var message='dickbutt';
  var isfist=false;
  var isvertical=false;
  var isshield=false;
  var Wsum=0; //angular velocity sum

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

   // socket.emit('shield', isvertical&&isshield);
  });

  var addEvents = function(myo){
    myo.on('fist', function(){
      console.log('fist');
      isfist=true;

    })

    myo.on('wave_out', function(){
      console.log('attack');

    })

    myo.on('pose_off', function(fist_off){
      //console.log('fist off');
      isfist=false;
      socket.emit('raw data', "fist off");
    })

    myo.on('imu', function(data){
      if(data.accelerometer.x < -0.8)
        isvertical=true;
      else
        isvertical=false;
      Wsum = Math.round((data.gyroscope.x+data.gyroscope.y+data.gyroscope.z)*1000)/1000;

      //console.log(isvertical);
      message="orientation: w x y z:" +"<br> " + Math.round(data.orientation.w*100)/100
                                      + "<br> " + Math.round(data.orientation.x*100)/100
                                      + "<br> " + Math.round(data.orientation.y*100) /100
                                      + "<br> " + Math.round(data.orientation.z*100)/100;

      message+="<br>gyroscope: x y z:" +"<br> " + Math.round(data.gyroscope.x*1000)/1000
                                  +"<br> " + Math.round(data.gyroscope.y*1000)/1000
                                  +"<br> " + Math.round(data.gyroscope.z*1000)/1000
                                  +"<br> SUM: " + Wsum;

      message+="<br>accelorometer: x y z:" +"<br> " + Math.round(data.accelerometer.x*100)/100
                                 +"<br> " + Math.round(data.accelerometer.y*100)/100
                                 +"<br> " + Math.round(data.accelerometer.z*100)/100;
      socket.emit('raw data', message);

      socket.emit('shield', isvertical&&isfist);


      if(data.gyroscope.z>200){
        console.log("moveleft");
      }
      if(data.gyroscope.z<-200){
        console.log("move right");
      }
      if(isvertical&&isfist){
        console.log("shieldup")
      }
    })    

  }
  Myo.connect();
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
