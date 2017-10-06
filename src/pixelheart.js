
import {PerspectiveCamera, Scene, Mesh, CubeGeometry, MeshStandardMaterial, WebGLRenderer, Vector3, PointLight, Object3D} from 'three';

var THREE = {
    PerspectiveCamera: PerspectiveCamera,
    Scene: Scene,
    Mesh: Mesh,
    CubeGeometry: CubeGeometry,
    MeshStandardMaterial: MeshStandardMaterial,
    WebGLRenderer: WebGLRenderer,
    Vector3: Vector3,
    PointLight: PointLight,
    Object3D: Object3D
}

var container;
var camera, light, scene, renderer, pink, cube;
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
    
    pink = new THREE.MeshStandardMaterial({ color: "#F660AB" });
    cube = new THREE.CubeGeometry( 10, 10, 10 );

/*

     XXX XXX 
    X   X   X
    X       X
    X   O   X
     X     X
      X   X
       X X
        X


*/

    //organise by columns because maths
    let data = [
        0b00001110,
        0b00010001,
        0b00100001,
        0b01000001,
        0b10000010,
        0b01000001,
        0b00100001,
        0b00010001,
        0b00001110
    ];

    console.log(data); 
    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-33,-33,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-22,-33,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-11,-33,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(11,-33,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(22,-33,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(33,-33,0);    
    pixelheart.add(pixel);


    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-44,-22,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(0,-22,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(44,-22,0);    
    pixelheart.add(pixel);


    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-44,-11,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(44,-11,0);    
    pixelheart.add(pixel);


    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-44,0,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(44,0,0);    
    pixelheart.add(pixel);


    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-33,11,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(33,11,0);    
    pixelheart.add(pixel);


    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-22,22,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(22,22,0);    
    pixelheart.add(pixel);


    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-11,33,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(11,33,0);    
    pixelheart.add(pixel);


    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(-11,33,0);    
    pixelheart.add(pixel);

    var pixel = new THREE.Mesh( cube, pink );
    pixel.position.set(0,44,0);    
    pixelheart.add(pixel);




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

