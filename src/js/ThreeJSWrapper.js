// ThreeJsWrappers.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SceneUtils from './SceneUtils'; // Ensure this is correctly imported or defined

export class RendererWrapper {
    constructor(container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);
    }
    render(scene, camera) {
        this.renderer.render(scene, camera);
    }
    setSize(width, height) {
        this.renderer.setSize(width, height);
    }
    getDomElement() {
        return this.renderer.domElement;
    }
}

export class CameraWrapper {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 500);
    }
    getCamera() {
        return this.camera;
    }
    updateProjectionMatrix() {
        this.camera.updateProjectionMatrix();
    }
    setPosition(x, y, z) {
        this.camera.position.set(x, y, z);
    }
    setAspectRatio(aspectRatio) {
        this.camera.aspect = aspectRatio;
    }
}

export class ControlsWrapper {
    constructor(cameraWrapper, rendererWrapper) {
        this.controls = new OrbitControls(cameraWrapper.getCamera(), rendererWrapper.getDomElement());
        this.controls.target.set(0, 0, 0);
    }
    update() {
        this.controls.update();
    }
}

export class SceneWrapper {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
    }
    add(object) {
        this.scene.add(object);
    }
    remove(object) {
        this.scene.remove(object);
    }
    clear() {
        while (this.scene.children.length) {
            this.scene.remove(this.scene.children[0]);
        }
    }
    getScene() {
        return this.scene;
    }
    addPlane(size) {
        const plane = SceneUtils.createPlane(size); // Ensure this function exists and correctly creates a THREE.Mesh or equivalent
        this.scene.add(plane);
    }
}
