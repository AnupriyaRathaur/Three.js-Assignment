# Three.js Assignment – Object Highlighter Using Stencil Buffer

## Objective:
The goal of this project is to create a 3D scene using Three.js where users can interact with objects (such as cubes or spheres) and highlight them with an outline using the stencil buffer technique.

## Features:
- A 3D scene with a ground plane.
- At least 5 different objects (e.g., box, sphere, cone, etc.) placed in 3D space.
- Directional or point lighting to illuminate the scene.
- OrbitControls for navigating the scene.
- Raycasting to detect mouse clicks and identify which object is selected.
- A stencil buffer outline highlighting the selected object (only one object highlighted at a time).

## How to Run:
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/"
  }
}
</script>

run:
using Live Server
Host link : https://3dhighlighter.netlify.app/
