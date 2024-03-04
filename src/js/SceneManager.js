// src/js/SceneManager.js
import * as THREE from "three";
import Box from "./Box.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class SceneManager {
    constructor(container) {
	this.container = container;
	this.scene = new THREE.Scene();
	this.scene.background = new THREE.Color(0xffffff); // Set background to white
	this.camera = new THREE.PerspectiveCamera(
	    75,
	    window.innerWidth / window.innerHeight,
	    0.1,
	    1000,
	);
	this.renderer = new THREE.WebGLRenderer({ antialias: true });
	this.raycaster = new THREE.Raycaster();
	this.mouse = new THREE.Vector2();
	this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
	this.boxes = []; // Add this in the constructor of SceneManager
	this.init();
    }

    init() {
	this.camera.position.set(0, 0, 500);
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.container.appendChild(this.renderer.domElement);

	// Set up OrbitControls
	this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	this.controls.target.set(0, 0, 0); // Optionally, set the point the camera will orbit around
	this.controls.update();

	// Event listeners
	window.addEventListener("resize", this.onWindowResize.bind(this), false);
	this.renderer.domElement.addEventListener(
	    "click",
	    this.onCanvasClick.bind(this),
	    false,
	);
	this.renderer.domElement.addEventListener(
	    "touchstart",
	    this.onCanvasTouch.bind(this),
	    false,
	);
	this.renderer.domElement.addEventListener('dblclick', this.onDoubleClick.bind(this), false);

	this.animate();
    }

    onWindowResize() {
	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onCanvasClick(event) {
	const rect = this.renderer.domElement.getBoundingClientRect();
	this.addBox(event.clientX - rect.left, event.clientY - rect.top);
    }

    onCanvasTouch(event) {
	event.preventDefault();
	if (event.touches.length > 0) {
	    const touch = event.touches[0];
	    const rect = this.renderer.domElement.getBoundingClientRect();
	    this.addBox(touch.clientX - rect.left, touch.clientY - rect.top);
	}
    }

    addBox(x, y) {
	// Adjust to normalized device coordinates
	this.mouse.x = (x / this.renderer.domElement.clientWidth) * 2 - 1;
	this.mouse.y = -(y / this.renderer.domElement.clientHeight) * 2 + 1;

	// Update the picking ray with the camera and mouse position
	this.raycaster.setFromCamera(this.mouse, this.camera);

	// Initialize a new Vector3 for the intersection point
	const intersectionPoint = new THREE.Vector3();

	// Determine the point where the picking ray intersects the plane
	if (this.raycaster.ray.intersectPlane(this.plane, intersectionPoint)) {
            const box = new Box(60, 30, 30, 0x000000, {x: intersectionPoint.x, y: intersectionPoint.y, z: intersectionPoint.z});
            this.scene.add(box.mesh);
	    this.boxes.push(box); // Keep track of the box
	}
    }
    
    animate() {
	requestAnimationFrame(() => this.animate());
	this.controls.update();

	// Display camera position and rotation on the screen
	this.showCameraInfo();

	this.renderer.render(this.scene, this.camera);
    }

    showCameraInfo() {
	const pos = this.camera.position;
	const rot = this.camera.rotation;
	const info = `Position: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}) Rotation: (${rot.x.toFixed(2)}, ${rot.y.toFixed(2)}, ${rot.z.toFixed(2)})`;
	// Assuming you have an element with id 'cameraInfo' in your HTML
	document.getElementById("cameraInfo").innerText = info;
    }
}
