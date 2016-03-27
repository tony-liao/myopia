console.log('running');
//var socket = io();
// set the scene size
var WIDTH = window.innerWidth-80,
  HEIGHT = window.innerHeight-45;

// set some camera attributes
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');
// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// set up the sphere vars
/*var radius = 50,
    segments = 16,
    rings = 16;

// create the sphere's material
var sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

// create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(
    radius,
    segments,
    rings),
  sphereMaterial);

// add the sphere to the scene
scene.add(sphere);
*/

// instantiate a loader
var loader = new THREE.JSONLoader();

var sword;
// load a resource
loader.load(
	// resource URL
	'sword',
	// Function when resource is loaded
	function ( geometry, materials ) {
		var material = new THREE.MultiMaterial( materials );
		sword = new THREE.Mesh( geometry, material );
    sword.scale.set(0.3,0.3,0.3);
    sword.position.set(0,0,0);
    sword.rotation.z = 1.57;
    sword.rotation.x = -1.57;
		scene.add(sword);
	}
);

// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}

render();

socket.on('orientation', function(o){
  sword.position.x = o.z*-400;
  sword.position.y = o.y*180;
  sword.rotation.x = Math.atan(sword.position.y/200);
  sword.rotation.y = Math.atan(sword.position.x/200);
});

$(window).keypress(function (e){
  if(e.keyCode == 32){ //spacebar
    console.log('attempting to zero');
    socket.emit('zero');
  }
});
