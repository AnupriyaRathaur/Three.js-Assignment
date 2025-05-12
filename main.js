import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth motion (inertia)
controls.dampingFactor = 0.05;
controls.enableZoom = true;    // Allow zooming
controls.enablePan = true;     // Allow panning
controls.target.set(0, 0, 0);  // Camera looks at this point
controls.update();           

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10,10,10);
directionalLight.castShadow = true; 
scene.add(directionalLight);

const directionalHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalHelper);

const pointLight = new THREE.PointLight(0xffaa00, 1, 100); // warm color, full intensity, distance = 100
pointLight.position.set(0, 10, 0); // position above the scene
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);


// Ground Plane
const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -5;
scene.add(plane);


// Adding Objects
const geometry1 = new THREE.BoxGeometry(3, 3, 3);
const material1 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry1, material1);
cube.position.set(-10, 0, 0);
scene.add(cube);

const geometry2 = new THREE.SphereGeometry(2, 32, 32);
const material2 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const sphere = new THREE.Mesh(geometry2, material2);
sphere.position.set(10, 0, 0);
scene.add(sphere);

const geometry3 = new THREE.ConeGeometry(2, 5, 32);
const material3 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cone = new THREE.Mesh(geometry3, material3);
cone.position.set(0, 0, 10);
scene.add(cone);

const geometry4 = new THREE.TorusGeometry(2, 0.5, 16, 100);
const material4 = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // Yellow
const torus = new THREE.Mesh(geometry4, material4);
torus.position.set(0, 0, -10);
scene.add(torus);

const geometry5 = new THREE.CylinderGeometry(2, 2, 5, 32);
const material5 = new THREE.MeshStandardMaterial({ color: 0xff00ff }); // Magenta
const cylinder = new THREE.Mesh(geometry5, material5);
cylinder.position.set(0, 5, 0);
scene.add(cylinder);

//Stencil Outline SHader Setup
const outlineMaterial = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  depthTest: false,
  stencilWrite: true,
  stencilFunc: THREE.AlwaysStencilFunc,
  stencilFail: THREE.ReplaceStencilOp,
  stencilZFail: THREE.ReplaceStencilOp,
  stencilRef: 1,
  stencilMask: 0xFF,
  colorWrite: false,
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red outline
    }
  `,
});

//Raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Event listener for mouse clicks
window.addEventListener('click', (event) => {
  // Normalize mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycasting to check for intersections
  raycaster.updateMatrixWorld();
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    // Highlight the first intersected object
    const object = intersects[0].object;
    highlightObject(object);
  }
});
camera.position.set(0, 10, 30);
camera.lookAt(0, 0, 0);


// Function to highlight the object
function highlightObject(object) {
  // Remove previous outline
  scene.traverse((child) => {
    if (child.material && child.material.stencilWrite) {
      child.material = child.originalMaterial;
    }
  });

  // Add outline effect to the clicked object
  object.originalMaterial = object.material;
  object.material = outlineMaterial;
}


// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Update OrbitControls
  controls.update();

  // Render Scene
  renderer.render(scene, camera);
}

animate();