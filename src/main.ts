import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DepthFormat } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


interface CubeDimensions {
  width: number;
  height: number;
  depth: number;
}

interface Vect {
  x: number;
  y: number;
  z: number;
}

const addCube = ({width, height, depth}: CubeDimensions, pos: Vect={x: 0, y: 0, z: 0}) => {
  const geometry = new THREE.BoxGeometry( width, height, depth );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(pos.x, pos.y, pos.z)
  scene.add( cube );
  return cube;
}



const addRow = (segments: number, size: number, gap:number=0) => {
  for (let i = 0; i < segments; i++){
    addCube({
      width: size,
      height: size,
      depth: size,
    }, {
      x: (i * size) + (gap * i),
      y: 0,
      z: 0
    }
    )
  }
}

addRow(3, 1, 0.1);



camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  controls.update();
}
animate();