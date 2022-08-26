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

type Direction = 'left' | 'right' | 'forward' | 'back' | 'up' | 'down'

const addCube = ({width, height, depth}: CubeDimensions, pos: Vect={x: 0, y: 0, z: 0}, color:number=0x00ff00) => {
  const geometry = new THREE.BoxGeometry( width, height, depth );
  const material = new THREE.MeshBasicMaterial( { color } );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(pos.x, pos.y, pos.z)
  scene.add( cube );
  return cube;
}



const addRow = (segments: number, size: number, gap:number=0, color:number=0xffffff, direction: Direction='right' ) => {
  const getPosition = (direction: Direction, i: number, size: number): Vect => {
    const positions = {
      'right': {
        x: (i * size) + (gap * i),
        y: 0,
        z: 0
      },
      'left': {
        x: -(i * size) - (gap * i),
        y: 0,
        z: 0
      },
      'forward': {
        x: 0,
        y: 0,
        z: (i * size) + (gap * i)
      },
      'back': {
        x: 0,
        y: 0,
        z: -(i * size) - (gap * i)
      },
      'up': {
        x: 0,
        y: (i * size) + (gap * i),
        z: 0
      },
      'down': {
        x: 0,
        y: -(i * size) - (gap * i),
        z: 0
      },
    }
    return positions[direction]
  }

  for (let i = 0; i < segments; i++){
    let pos = getPosition(direction, i, size)
    addCube({
      width: size,
      height: size,
      depth: size,
    }, pos,
    color
    )
  }
}

addRow(3, 1, 0.1, 0x7304d4);

addRow(3, 1, 0.1, 0x7304d4, 'left');

addRow(3, 1, 0.1, 0x7304d4, 'forward');

addRow(3, 1, 0.1, 0x7304d4, 'back');

addRow(3, 1, 0.1, 0x7304d4, 'up');

addRow(3, 1, 0.1, 0x7304d4, 'down');

camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  controls.update();
}
animate();