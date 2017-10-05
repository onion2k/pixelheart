
import {PerspectiveCamera, Scene, Mesh, CubeGeometry, MeshStandardMaterial, WebGLRenderer, Vector3, PointLight} from 'three';

var THREE = {
    PerspectiveCamera: PerspectiveCamera,
    Scene: Scene,
    Mesh: Mesh,
    CubeGeometry: CubeGeometry,
    MeshStandardMaterial: MeshStandardMaterial,
    WebGLRenderer: WebGLRenderer,
    Vector3: Vector3,
    PointLight: PointLight
}

var container;
var camera, light, scene, renderer;
let pixelheart = [];
var cube, plane;
var startTime	= Date.now();

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function init() {

    // create the Scene
    scene = new THREE.Scene();
    
    // create the Cube
    cube = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 50 ), new THREE.MeshStandardMaterial({ color: "#ff4444" }) );

    // add the object to the scene
    scene.add( cube );

    // create the camera
    camera = new THREE.PerspectiveCamera( 70, 800/600, 1, 1000 );
    camera.position.y = 150;
    camera.position.z = 150;
    camera.lookAt( cube.position );

    var light = new THREE.PointLight( 0xffffff, 1, 1000 );
    light.position.set( 150, 150, 150 );
    scene.add( light );

    // create the container element
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // init the WebGL renderer and append it to the Dom
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800,600 );
    container.appendChild( renderer.domElement );

}
/**
 * Render the 3D scene
*/
function render() {
    // animate the cube
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.0225;
    cube.rotation.z += 0.0175;
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

