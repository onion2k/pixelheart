import { Mesh } from '../node_modules/three/src/objects/Mesh';
import { BoxBufferGeometry } from '../node_modules/three/src/geometries/BoxGeometry';
import { MeshPhongMaterial } from '../node_modules/three/src/materials/MeshPhongMaterial';
import { Object3D } from '../node_modules/three/src/core/Object3D';

function createPixelheart(){

    let cube;
    let pixelheart = new Object3D();

    let x;
    let s = 12;
    let g = 0;
    let d = s+g;
    let sh = d/2;
    let d5 = d*5;

    let cubeGeo = new BoxBufferGeometry( s, s, s );

    let c = [
        { layer: 6, color: "#F660AB", pos: [0,28,62,126,254,508,254,126,62,28,0]},
        { layer: 5, color: "#000000", pos: [28,34,65,129,257,514,257,129,65,34,28]},
        { layer: 4, color: "#F660AB", pos: [0,28,62,126,254,508,254,126,62,28,0]}
    ];

    let colors = [];

    c.forEach((cube)=>{

        x = 0;

        colors[0] = new MeshPhongMaterial({ color: cube.color, shininess: 0 });
        colors[1] = new MeshPhongMaterial({ color: cube.color, shininess: 25 });
        colors[2] = new MeshPhongMaterial({ color: cube.color, shininess: 50 });
        colors[3] = new MeshPhongMaterial({ color: cube.color, shininess: 100 });
        
        cube.pos.forEach((v)=>{
            x++;
            for (var y=0;y<10;y++){
                if (!!(v & (1<<y))) {
                    var pixel = new Mesh( cubeGeo, colors[Math.floor(Math.random()*4)] );
                    pixel.position.set((d5-(x*d)+d),d5-(y*d),d5-(cube.layer*d));
                    pixelheart.add(pixel);
                }
            }
        });
    });

    return pixelheart;

}

export default createPixelheart();
