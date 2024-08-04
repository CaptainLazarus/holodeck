// Assuming SceneUtils is properly imported and contains the necessary methods.
import { RendererWrapper, CameraWrapper, ControlsWrapper, SceneWrapper } from './ThreeJSWrapper';
import * as THREE from 'three';
import SceneUtils from './SceneUtils';

export default class SceneRenderer {
    constructor(sceneManager, container) {
        this.sceneManager = sceneManager;
        this.rendererWrapper = new RendererWrapper(container);
        this.cameraWrapper = new CameraWrapper();
        this.controlsWrapper = new ControlsWrapper(this.cameraWrapper, this.rendererWrapper);
	// this.raycaster = new THREE.Raycaster();
        this.sceneWrapper = new SceneWrapper();
        this.setupEventListeners();
        this.animate();
    }

    setupEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.rendererWrapper.getDomElement().addEventListener('click', this.handleClick.bind(this), false);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controlsWrapper.update();
	this.showCameraInfo();
        // this.renderScene();
        this.rendererWrapper.render(this.sceneWrapper.getScene(), this.cameraWrapper.getCamera());
    }

    renderScene() {
        this.sceneWrapper.clear();
        this.renderBoxes();
    }

    renderBoxes() {
        for (const box of this.sceneManager.boxes) {
            const mesh = SceneUtils.createBox(box.width, box.height, box.depth, box.color, box.position);
            this.sceneWrapper.add(mesh);
        }
    }

    onWindowResize() {
        this.cameraWrapper.setAspectRatio(window.innerWidth / window.innerHeight);
        this.cameraWrapper.updateProjectionMatrix();
        this.rendererWrapper.setSize(window.innerWidth, window.innerHeight);
    }

    handleClick(event) {
	const rect = this.rendererWrapper.getDomElement().getBoundingClientRect();
	this.addBox(event.clientX - rect.left, event.clientY - rect.top);
    }

    addBox(){
	this.mouse.x = (x / this.renderer.domElement.clientWidth) * 2 - 1;
	this.mouse.y = -(y / this.renderer.domElement.clientHeight) * 2 + 1;
	this.sceneWrapper.getScene().raycaster.setFromCamera(this.mouse, this.camera);

	// Initialize a new Vector3 for the intersection point
	const intersectionPoint = new THREE.Vector3();

	// Determine the point where the picking ray intersects the plane
	if (this.raycaster.ray.intersectPlane(this.plane, intersectionPoint)) {
            const box = new Box(60, 30, 30, 0x000000, {x: intersectionPoint.x, y: intersectionPoint.y, z: intersectionPoint.z});
            this.scene.add(box.mesh);
	    this.boxes.push(box); // Keep track of the box
	}
    }

    handleBoxClick(intersectedBox) {
        // Example: toggle box color between default and highlight.
        const newColor = intersectedBox.material.color.getHex() === this.defaultColor ? this.highlightColor : this.defaultColor;
        intersectedBox.material.color.setHex(newColor);

        // Update sceneManager or handle as needed
    }

    handlePlaneClick(raycaster) {
        const intersects = SceneUtils.getIntersectingObjects(raycaster, [this.sceneWrapper.getScene().children.find(child => child.type === 'Mesh')]);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            this.sceneManager.addBox({
                width: 50,
                height: 50,
                depth: 50,
                color: this.defaultColor,
                position: intersect.point
            });
        }
    }

    showCameraInfo() {
	const pos = this.cameraWrapper.camera.position;
	const rot = this.cameraWrapper.camera.rotation;
	const info = `Position: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}) Rotation: (${rot.x.toFixed(2)}, ${rot.y.toFixed(2)}, ${rot.z.toFixed(2)})`;
	document.getElementById("cameraInfo").innerText = info;
    }
}
