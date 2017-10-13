import {Mesh, BoxBufferGeometry, MeshPhysicalMaterial, Object3D} from 'three';

function createPixelheart(){

    let cube;
    let pixelheart = new Object3D();

    let x;
    let s = 12;
    let g = 0;
    let d = s+g;
    let d5 = d*5;

    let cubeGeo = new BoxBufferGeometry( s, s, s );

    let c = [
        { layer: 6, color: "#F660AB", pos: [0,28,62,126,254,508,254,126,62,28,0]},
        { layer: 5, color: "#FFFFFF", pos: [28,34,65,129,257,514,257,129,65,34,28]},
        { layer: 4, color: "#F660AB", pos: [0,28,62,126,254,508,254,126,62,28,0]}
    ];

    c.forEach((cube)=>{
        x = 0;
        let color = new MeshPhysicalMaterial({ color: cube.color });
        cube.pos.forEach((v)=>{
            x++;
            for (var y=0;y<10;y++){
                if (!!(v & (1<<y))) {
                    var pixel = new Mesh( cubeGeo, color );
                    pixel.position.set(d5-(x*d),d5-(y*d),d5-(cube.layer*d));
                    pixelheart.add(pixel);
                }
            }
        });
    });

    return pixelheart;

}

export default createPixelheart();
