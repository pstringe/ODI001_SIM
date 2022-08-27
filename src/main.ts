import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set( 50, 50, 50 );

//const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointLight);

pointLight.position.set(0, 0, 0);

type Direction = 'left' | 'right' | 'forward' | 'back' | 'up' | 'down'

const addCube = ({width, height, depth}: CubeDimensions, pos: Vect={x: 0, y: 0, z: 0}, color:number=0x00ff00) => {
  const geometry = new THREE.BoxGeometry( width, height, depth );
  const material = new THREE.MeshBasicMaterial( { color } );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(pos.x, pos.y, pos.z)
  scene.add( cube );
  return cube;
}

const addSphere = (radius: number, pos: Vect={x: 0, y: 0, z: 0}, color:number=0x00ff00) => {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff});
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(pos.x, pos.y, pos.z);
  scene.add(sphere);
}


const addRow = (segments: number, size: number, gap:number=0, color:number=0xffffff, direction: Direction='right', offset:number=0 ) => {
  const getPosition = (direction: Direction, i: number, size: number, offset: number): Vect => {
    const positions = {
      'right': {
        x: (i * size) + (gap * i) + offset,
        y: 0,
        z: 0
      },
      'left': {
        x: -(i * size) - (gap * i) - offset,
        y: 0,
        z: 0
      },
      'forward': {
        x: 0,
        y: 0,
        z: (i * size) + (gap * i) + offset
      },
      'back': {
        x: 0,
        y: 0,
        z: -(i * size) - (gap * i) - offset
      },
      'up': {
        x: 0,
        y: (i * size) + (gap * i) + offset,
        z: 0
      },
      'down': {
        x: 0,
        y: -(i * size) - (gap * i) - offset,
        z: 0
      },
    }
    return positions[direction]
  }

  for (let i = 0; i < segments; i++){
    let pos = getPosition(direction, i, size, offset)
    addCube({
      width: size,
      height: size,
      depth: size,
    }, pos,
    color
    )
  }
}

const LENGTH: number = 3;
const GAP: number = 0.1;
const COLOR: number = 0x7304d4;
const SIZE: number = 1;
const OFFSET: number = GAP + SIZE;

addRow(LENGTH, SIZE, GAP, COLOR, 'right', OFFSET);

addRow(LENGTH, SIZE, GAP, COLOR, 'left', OFFSET);

//addRow(LENGTH, SIZE, GAP, 0x7304d4, 'forward', OFFSET);

addRow(3, SIZE, GAP, COLOR, 'back', OFFSET);

//addRow(LENGTH, SIZE, GAP, 0x7304d4, 'up', OFFSET);

//addRow(LENGTH, SIZE, GAP, 0x7304d4, 'down', OFFSET);

addSphere(0.5, {x: 0, y: 0, z: 0}, COLOR)
camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  controls.update();
}
animate();