
import {PerspectiveCamera, Scene, Mesh, BoxBufferGeometry, MeshStandardMaterial, MeshPhysicalMaterial, WebGLRenderer, Vector3, PointLight, Object3D} from 'three';

var THREE = {
    PerspectiveCamera: PerspectiveCamera,
    Scene: Scene,
    Mesh: Mesh,
    BoxBufferGeometry: BoxBufferGeometry,
    MeshStandardMaterial: MeshStandardMaterial,
    MeshPhysicalMaterial: MeshPhysicalMaterial,
    WebGLRenderer: WebGLRenderer,
    Vector3: Vector3,
    PointLight: PointLight,
    Object3D: Object3D
}

var container;
var camera, light, scene, renderer;
let pixelheart = new THREE.Object3D();
var cube, plane;
var startTime	= Date.now();
var speed = 0.25;


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

    let y;
    let s = 12;
    let g = 0;
    let d = s+g;
    let d5 = d*5;
    let cubeGeo = new THREE.BoxBufferGeometry( s, s, s );
    let c = [
        { layer: 6, color: "#F660AB", pos: [0,28,62,126,254,508,254,126,62,28,0]},
        { layer: 5, color: "#FFFFFF", pos: [28,34,65,129,257,514,257,129,65,34,28]},
        { layer: 4, color: "#F660AB", pos: [0,28,62,126,254,508,254,126,62,28,0]}
    ];
    c.forEach((cube)=>{
        y = 0;
        let color = new THREE.MeshPhysicalMaterial({ color: cube.color });
        cube.pos.forEach((v)=>{
            y++;
            for (var x=0;x<10;x++){
                if (!!(v & (1<<x))) {
                    var pixel = new THREE.Mesh( cubeGeo, color );
                    pixel.position.set(d5-(y*d),d5-(x*d),d5-(cube.layer*d));
                    pixelheart.add(pixel);
                }
            }
        });
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
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(800,600 );
    container.appendChild( renderer.domElement );

}
/**
 * Render the 3D scene
*/
function render() {
    // animate the cube
    pixelheart.rotation.x += 0.02*speed;
    pixelheart.rotation.y += 0.0225*speed;
    pixelheart.rotation.z += 0.0175*speed;
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

