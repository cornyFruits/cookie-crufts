import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// scene setup 
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#f4f0eb');

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// raycasting setup (mapping 2D mouse coordinates to 3D space)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// lighting setup 
const ambient = new THREE.AmbientLight(0xffffff, 0.8); 
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1.2);
directional.position.set(5, 10, 7);
scene.add(directional);

// controls setup (for orbiting around the model)
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


// load cereal box (blender model) 
const loader = new GLTFLoader();
let boxModel;

loader.load('./model/cereal-box.glb', (gltf) => {
  boxModel = gltf.scene;
  
  // ensure raycasting works on invisible clickable panels too
  boxModel.traverse((child) => {
    if (child.isMesh) {
      child.frustumCulled = false; 
    }
  });

  scene.add(boxModel);
}, undefined, (error) => {
  console.error('Model load error:', error);
});


// interaction handling (click and hover)
// TODO: fix clickable elements aka this function
function handleInteraction(event) {
  if (!boxModel) return;

  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(boxModel, true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const name = clickedObject.name;

    // external links
    if (name === 'dino-github-btn') {
      window.open('https://github.com/cornyfruits', '_blank');
    } 
    else if (name === 'linkedin-laptop-btn') {
      window.open('https://www.linkedin.com/in/krittika-sharma-119b06245/', '_blank');
    }
    else if (name === 'barcode-rick-roll') {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }

    // TODO: Uncomment when sweepstakes function is complete
    // looks for any object name in blender containing "input-form"
    //else if (name.includes('input-form')) {
      //openSweepstakes(name); 
    //}
  }
}

/* TODO: Add send-to-email functionality to this form
function openSweepstakes(fieldName) {
  // Clean up the name for the prompt (e.g., "name-input-form" becomes "Name")
  const label = fieldName.replace('-input-form', '').toUpperCase();
  
  const userInput = prompt(`ENTER ${label} FOR THE KRITTIKA CLASSICS SWEEPSTAKES:`);
  
  if (userInput) {
    alert(`Entry recorded for ${label}: ${userInput}. Good luck, commodity!`);
    // Here is where you could eventually send data to a database
  }
}
*/

// Listen for clicks (+ touch for mobile)
canvas.addEventListener('click', handleInteraction);

// change cursor on hover over interactive areas
canvas.addEventListener('mousemove', (event) => {
  if (!boxModel) return;

  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(boxModel, true);

  if (intersects.length > 0 && (intersects[0].object.name.includes('btn') || intersects[0].object.name.includes('form'))) {
    canvas.style.cursor = 'pointer';
  } else {
    canvas.style.cursor = 'default';
  }
});

// animation loop 
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// start screen (click to enter)
document.getElementById('start-screen').addEventListener('click', () => {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('navbar').classList.remove('hidden');
  canvas.classList.remove('hidden');
});

// hamburger menu toggle for mobile
const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links'); 

  hamburger.onclick = () => {
    navLinks.classList.toggle('active');
  };

  // close menu when a link is clicked
  navLinks.querySelectorAll('a, button').forEach(link => {
    link.onclick = () => {
      navLinks.classList.remove('active');
    };
  });



// README typing animation within popup
const readmeContent = `README.TXT
================

COOKIE CRUFTS — A SOCIAL EXPERIMENT
by Krittika Sharma, 2026

Grads are commodities. 
TODO: complete this README`;

// handle README popup (opening and closing)
function openReadme() {
  const popup = document.getElementById('readme-popup');
  const textEl = document.getElementById('readme-text');
  popup.classList.remove('hidden');
  textEl.innerHTML = '';
  let i = 0;
  function type() {
    if (i < readmeContent.length) {
      textEl.innerHTML += readmeContent.charAt(i);
      i++;
      setTimeout(type, 25);
    }
  }
  type();
}

function closeReadme() {
  document.getElementById('readme-popup').classList.add('hidden');
}

window.openReadme = openReadme;
window.closeReadme = closeReadme;

