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
        this.renderScene();
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
        const mousePosition = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mousePosition, this.cameraWrapper.getCamera());

        const intersects = SceneUtils.getIntersectingObjects(raycaster, this.sceneWrapper.getScene().children);

        if (intersects.length > 0) {
            const firstIntersectedObject = intersects[0].object;
            this.handleBoxClick(firstIntersectedObject);
        } else {
            this.handlePlaneClick(raycaster);
        }
    }

    handleBoxClick(intersectedBox) {
        // Example: toggle box color between default and highlight.
        const newColor = intersectedBox.material.color.getHex() === this.defaultColor ? this.highlightColor : this.defaultColor;
        intersectedBox.material.color.setHex(newColor);

        // Update sceneManager or handle as needed
    }

    handlePlaneClick(raycaster) {
        // Assume this method aims to add a new box where the plane was clicked.
        const intersects = SceneUtils.getIntersectingObjects(raycaster, [this.sceneWrapper.getScene().children.find(child => child.type === 'Mesh')]); // Assuming the plane is the first Mesh added to the scene

        if (intersects.length > 0) {
            const intersect = intersects[0];
            this.sceneManager.addBox({
                width: 50, // Example dimensions and color
                height: 50,
                depth: 50,
                color: this.defaultColor,
                position: intersect.point
            });
        }
    }
}
