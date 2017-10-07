
import {PerspectiveCamera, Scene, Mesh, CubeGeometry, MeshStandardMaterial, MeshPhysicalMaterial, WebGLRenderer, Vector3, PointLight, Object3D} from 'three';

var THREE = {
    PerspectiveCamera: PerspectiveCamera,
    Scene: Scene,
    Mesh: Mesh,
    CubeGeometry: CubeGeometry,
    MeshStandardMaterial: MeshStandardMaterial,
    MeshPhysicalMaterial: MeshPhysicalMaterial,
    WebGLRenderer: WebGLRenderer,
    Vector3: Vector3,
    PointLight: PointLight,
    Object3D: Object3D
}

var container;
var camera, light, scene, renderer, pink, black, cube;
let pixelheart = new THREE.Object3D();
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
    scene.add( pixelheart );
    
    black = new THREE.MeshPhysicalMaterial({ color: "#FFFFFF" });
    pink = new THREE.MeshPhysicalMaterial({ color: "#F660AB" });
    cube = new THREE.CubeGeometry( 10, 10, 10 );

    let s = 10;
    let g = 1;
    let d = s+g;
    let d4 = d*4;
    let d5 = d*5;

    let blackcubes = [
        0b0000011110,
        0b0000100011,
        0b0001000001,
        0b0010000001,
        0b0100000001,
        0b1000000010,
        0b0100000001,
        0b0010000001,
        0b0001000001,
        0b0000100011,
        0b0000011110
    ];

    let y;
    y = 0;
    blackcubes.forEach((v)=>{
        y++;
        for (var x=0;x<10;x++){
            if (!!(v & (1<<x))) {
                var pixel = new THREE.Mesh( cube, black );
                pixel.position.set(d5-(y*d),d5-(x*d),0);    
                pixelheart.add(pixel);
            }
        }
    });


    let pinkcubes = [
        0b00001110,
        0b00011111,
        0b00111111,
        0b01111111,
        0b11111110,
        0b01111111,
        0b00111111,
        0b00011111,
        0b00001110
    ];

    y = 0;
    pinkcubes.forEach((v)=>{
        y++;
        for (var x=0;x<8;x++){
            if (!!(v & (1<<x))) {
                var pixel = new THREE.Mesh( cube, pink );
                pixel.position.set(d4-(y*d),d4-(x*d),0);    
                pixelheart.add(pixel);
            }
        }
    });

    // create the camera
    camera = new THREE.PerspectiveCamera( 70, 800/600, 1, 1000 );
    camera.position.y = 150;
    camera.position.z = 150;
    camera.lookAt( pixelheart.position );

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
    pixelheart.rotation.x += 0.02;
    pixelheart.rotation.y += 0.0225;
    pixelheart.rotation.z += 0.0175;
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

