import { inject } from '@vercel/analytics';

inject();
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

/* TODO: add send-to-email functionality to this form
function openSweepstakes(fieldName) {
  // clean up the name for the prompt (e.g., "name-input-form" becomes "Name")
  const label = fieldName.replace('-input-form', '').toUpperCase();
  
  const userInput = prompt(`ENTER ${label} FOR THE KRITTIKA CLASSICS SWEEPSTAKES:`);
  
  if (userInput) {
    alert(`Entry recorded for ${label}: ${userInput}. Good luck, commodity!`);
    // Here is where you could eventually send data to a database
  }
}
*/

// listen for clicks (+ touch for mobile)
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
  document.getElementById('dress-dev-btn').classList.remove('hidden');
});

// hamburger menu toggle for mobile
const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links'); 

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
  });

  // close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});


// README typing animation within popup
const readmeContent = `README.TXT
================

COOKIE CRUFTS — A SOCIAL EXPERIMENT
by Krittika Sharma, 2026

THE PREMISE
The graduate market is a supermarket aisle.
Status and class decide which boxes sit at eye-level, while the rest stay on the bottom shelf, rarely reached for.

Sometimes, a box is carried halfway through the store and left next to a stack of tomato soup. No explanation. No notification. The shopper doesn't care; the store keeps running.

THE PACKAGING
This website is a box that knows it's a box. It is packaging aware of itself as packaging.

This experiment is whether creativity breaks the pattern, or if this is just a more interesting way to be ignored.

Thanks for looking around :)`;

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

// handle dress-the-dev-modal
window.openDressDev = () => {
  document.getElementById('dress-dev-popup').classList.remove('hidden');
};

window.closeDressDev = () => {
  document.getElementById('dress-dev-popup').classList.add('hidden');
};

// tab switching for dress-the-dev
const dressTabs = document.querySelectorAll('#dress-dev-popup [role="tab"]');
const closetGrid = document.getElementById('closet-grid');

// closet data 
const closetItems = {
  footwear: [
    {id: 'boots', thumb: 'images/dress-dev/boots-sidebar.png', onDoll: 'images/dress-dev/doll-boots.png'}, 
    {id: 'sneakers', thumb: 'images/dress-dev/sneakers-sidebar.png', onDoll: 'images/dress-dev/doll-sneakers.png'}, 
    {id: 'heels', thumb: 'images/dress-dev/heels-sidebar.png', onDoll: 'images/dress-dev/doll-heels.png'}
  ],

  bottoms: [
    {id: 'black-skirt', thumb: 'images/dress-dev/black-skirt-sb.png', onDoll: 'images/dress-dev/doll-black-skirt.png'}, 
    {id: 'brown-pants', thumb: 'images/dress-dev/brown-pants-sb.png', onDoll: 'images/dress-dev/doll-brown-pants.png'}, 
    {id: 'grey-pants', thumb: 'images/dress-dev/grey-pants-sb.png', onDoll: 'images/dress-dev/doll-grey-pants.png'}, 
    {id: 'grey-striped-skirt-sb', thumb: 'images/dress-dev/grey-striped-skirt-sb.png', onDoll: 'images/dress-dev/doll-grey-striped-skirt.png'}, 
    {id: 'jeans', thumb: 'images/dress-dev/jeans-sb.png', onDoll: 'images/dress-dev/doll-jeans.png'}
  ],

  tops: [
    {id: 'black-top', thumb: 'images/dress-dev/black-top-sidebar.png', onDoll: 'images/dress-dev/doll-black-top.png'}, 
    {id: 'burgundy-top', thumb: 'images/dress-dev/burgundy-top-sidebar.png', onDoll: 'images/dress-dev/doll-burgundy-top.png'}, 
    {id: 'green-top', thumb: 'images/dress-dev/green-top-sidebar.png', onDoll: 'images/dress-dev/doll-green-top.png'}, 
    {id: 'off-white-top', thumb: 'images/dress-dev/off-white-top-sidebar.png', onDoll: 'images/dress-dev/doll-off-white-top.png'}, 
    {id: 'orange-top', thumb: 'images/dress-dev/orange-top-sidebar.png', onDoll: 'images/dress-dev/doll-orange-top.png'}, 
    {id: 'pink-top', thumb: 'images/dress-dev/pink-top-sidebar.png', onDoll: 'images/dress-dev/doll-pink-top.png'}, 
    {id: 'sage-top', thumb: 'images/dress-dev/sage-top-sidebar.png', onDoll: 'images/dress-dev/doll-sage-top.png'}, 
    {id: 'highneck-top', thumb: 'images/dress-dev/highneck-top-sb.png', onDoll: 'images/dress-dev/doll-highneck-top.png'},
  ],
  accessories: [
    {id: 'burgundy-purse', thumb: 'images/dress-dev/burgundy-purse-sb.png', onDoll: 'images/dress-dev/doll-burgundy-purse.png'}, 
    {id: 'green-purse', thumb: 'images/dress-dev/green-purse-sb.png', onDoll: 'images/dress-dev/doll-green-purse.png'}, 
    {id: 'none', thumb: null, label: 'NO ACCESSORY', onDoll: ''}
  ],
  jewellery: [
    {id: 'black-necklace-long', thumb: 'images/dress-dev/black-necklace-long-sb.png', onDoll: 'images/dress-dev/doll-black-necklace-long.png'}, 
    {id: 'black-short-necklace', thumb: 'images/dress-dev/black-short-necklace-sidebar.png', onDoll: 'images/dress-dev/doll-short-black-necklace.png'}, 
    {id: 'green-bracelet', thumb: 'images/dress-dev/green-bracelet-sb.png', onDoll: 'images/dress-dev/doll-green-bracelet-rh.png'},
    {id: 'burgundy-bracelet', thumb: 'images/dress-dev/burgundy-bracelet-sb.png', onDoll: 'images/dress-dev/doll-burgundy-bracelet-lh.png'}, 
    {id: 'none', thumb: null, label: 'NO JEWELLERY', onDoll: ''}

  ], 
  jackets: [
    {id: 'navy-cardigan', thumb: 'images/dress-dev/navy-cardigan-sidebar.png', onDoll: 'images/dress-dev/doll-navy-cardigan.png'}, 
    {id: 'blazer', thumb: 'images/dress-dev/blazer-sb.png', onDoll: 'images/dress-dev/doll-blazer.png'}, 
    {id: 'none', thumb: null, label: 'NO JACKET', onDoll: ''}
  ]
};

dressTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    dressTabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    renderCloset(tab.dataset.category);
  });
});


function renderCloset(category) {
  const items = closetItems[category] || [];
  closetGrid.innerHTML = items.map(item => `
    <button class="closet-item" data-item="${item.id}" onclick="equipItem('${item.id}', '${category}')">
      ${item.thumb ? `<img src="${item.thumb}" alt="${item.id}">` : `<span class="none-x">${item.label}</span>`}
    </button>
  `).join('');
}

window.equipItem = (itemId, category) => {
  const item = closetItems[category].find(i => i.id === itemId);
  if (!item) return; 

  const layer = document.getElementById(`layer-${category}`);
  // account for none item for jacket, accessories and jewellery
  if (item.onDoll === '') {
    layer.src = '';
    layer.classList.add('hidden');
    equipped[category] = null;
  } else {
    layer.src = item.onDoll;
    layer.classList.remove('hidden');
    equipped[category] = item.onDoll;
  }

  // highlight selected thmnl within this category only
  document.querySelectorAll(`.closet-item`).forEach(el => {
    if (el.dataset.item === itemId) {
      el.classList.add('selected');
    } else if (closetItems[category].some(i => i.id === el.dataset.item)) {
      el.classList.remove('selected');
    }
  });

  checkExportEligibility();
};

// render initial tab on load
renderCloset('footwear');

// dress-the-dev export button 
const requiredCategories = ['bottoms', 'tops', 'footwear'];
const equipped = {}; 

function checkExportEligibility() {
  const exportBtn = document.getElementById('export-btn');
  const hasAll = requiredCategories.every(cat => equipped[cat]);
  exportBtn.disabled = !hasAll;
}

// dress-the-dev export png drawing
async function exportDoll() {
  const canvas = document.createElement('canvas');
  canvas.width = 1414;
  canvas.height = 2000;
  const ctx = canvas.getContext('2d');

  function loadImg(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  const template = await loadImg('images/dress-dev/dress-dev-template.png');
  ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

  const dollX = 476, dollY = 104, dollW = 456, dollH = 1405;
  
  // make doll bigger
  const DOLL_SCALE = 1.65; 

  const base = await loadImg('images/dress-dev/dev-doll-base.png');
  drawContained(ctx, base, dollX, dollY, dollW, dollH, DOLL_SCALE);

  const layerOrder = ['footwear', 'bottoms', 'tops', 'jackets', 'jewellery', 'accessories'];
  for (const cat of layerOrder) {
    if (equipped[cat]) {
      const layerImg = await loadImg(equipped[cat]);
      drawContained(ctx, layerImg, dollX, dollY, dollW, dollH, DOLL_SCALE);
    }
  }

  const link = document.createElement('a');
  link.download = 'dress-the-dev.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// helper func to fix vertical squish of doll exported png
function drawContained(ctx, img, boxX, boxY, boxW, boxH, scale=1) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = boxW / boxH;

  let drawW, drawH;
  if (imgRatio > boxRatio) {
    // image wider than box; fit to width
    drawW = boxW;
    drawH = boxW / imgRatio;
  } else {
    // image taller than box; fit to height
    drawH = boxH;
    drawW = boxH * imgRatio;
  }

  drawW *= scale;
  drawH *= scale;

  // center image within the box
  const centerX = boxX + boxW / 2;
  const centerY = boxY + boxH / 2;
  const offsetX = boxX + (boxW - drawW) / 2;
  const offsetY = boxY + (boxH - drawH) / 2;

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

window.exportDoll = exportDoll;
