import { OrthographicCamera } from '../node_modules/three/src/cameras/OrthographicCamera';
import { Scene } from '../node_modules/three/src/scenes/Scene';
import { Mesh } from '../node_modules/three/src/objects/Mesh';
import { WebGLRenderer } from '../node_modules/three/src/renderers/WebGLRenderer';
import { Vector3 } from '../node_modules/three/src/math/Vector3';
import { AmbientLight } from '../node_modules/three/src/lights/AmbientLight';
import { PointLight } from '../node_modules/three/src/lights/PointLight';

import pixelheart from './pixelheartGeo.js';
import pixelheartCss from './pixelheart.css';

var THREE = {
    OrthographicCamera: OrthographicCamera,
    Scene: Scene,
    WebGLRenderer: WebGLRenderer,
    Vector3: Vector3,
    AmbientLight: AmbientLight, 
    PointLight: PointLight,
}

var container;
var camera, scene, renderer;
var hearts = [];
var totalHearts = 24;
var dist = 160;

function init() {

    // create the Scene
    scene = new THREE.Scene();

    for (var h=0;h<totalHearts;h++){
        var p = pixelheart.clone();
        p.position.x = (dist*2.5) - (Math.floor(h%6) * dist);
        p.position.y = (dist*1.5) - (Math.floor(h/6) * dist);
        hearts.push(p);
        scene.add( p );
    }
    
    // create the camera
    camera = new THREE.OrthographicCamera( -480, 480, 320, -320, -400, 400 );
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
        
        var p = (Math.floor(h/6)+h)%2;
        if (p===0) {
            hearts[h].rotation.y+=0.025;
        } else if (p===1) {
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

