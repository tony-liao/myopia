var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
var Myo = require('myo');  
var message='dickbutt';
Myo.onError = function () {  
        console.log("Woah, couldn't connect to Myo Connect");
        message="error";
}

Myo.on('connected', function(){  
    console.log("TONY EATS ASS");

        message="connected";
    myMyo = this;

    myMyo.streamEMG(true);
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
	if(datasum>10)
    console.log("strong");
	else
		console.log("weak");
});
 //    myMyo.on('bluetooth_strength', function(val){
 //    console.log('Such strength', val);
	// });
	// myMyo.requestBluetoothStrength();
    


}

Myo.connect();


router.get('/', function(req, res){
	res.render('index', {status: message})
})

module.exports = router;
