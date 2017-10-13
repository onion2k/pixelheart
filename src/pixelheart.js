
import {OrthographicCamera, Scene, Mesh, BoxBufferGeometry, MeshStandardMaterial, MeshPhysicalMaterial, WebGLRenderer, Vector3, AmbientLight, PointLight, Object3D} from 'three';

import pixelheart from './pixelheartGeo.js';

var THREE = {
    OrthographicCamera: OrthographicCamera,
    Scene: Scene,
    WebGLRenderer: WebGLRenderer,
    Vector3: Vector3,
    AmbientLight: AmbientLight, 
    PointLight: PointLight,
}

var container;
var camera, light, scene, renderer;
var startTime = Date.now();
var speed = 1.0;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var hearts = [];
var totalHearts = 24;

function init() {

    // create the Scene
    scene = new THREE.Scene();

    for (var h=0;h<totalHearts;h++){
        var p = pixelheart.clone();
        p.position.x = 375 - (Math.floor(h%6) * 150);
        p.position.y = 225 - (Math.floor(h/6) * 150);
        hearts.push(p);
        scene.add( p );
    }
    
    // create the camera
    //camera = new THREE.PerspectiveCamera( 70, 800/600, 1, 1000 );
    camera = new THREE.OrthographicCamera( -400, 400, 300, -300, -300, 300 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 50;

    var light = new THREE.AmbientLight( 0x808080 );
    scene.add( light );
    
    var light = new THREE.PointLight( 0xffffff, 1, 2500 );
    light.position.set( 250, 500, 500 );
    scene.add( light );

    // create the container element
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // init the WebGL renderer and append it to the Dom
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(800,600 );
    container.appendChild( renderer.domElement );

}
/**
 * Render the 3D scene
*/
function render() {

    for (var h=0;h<totalHearts;h++){
        if ((Math.floor(h/6)+h)%2==0) {
            hearts[h].rotation.y+=0.025;
        } else {
            hearts[h].rotation.x-=0.025;
        }
    }

    // actually display the scene in the Dom element
    renderer.render( scene, camera );
}
/**
 * animate and display the scene
*/
function animate() {
    // render the 3D scene
    render();
    // relaunch the 'timer' 
    requestAnimationFrame( animate );
}

init();
animate();

