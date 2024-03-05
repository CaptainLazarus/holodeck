import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as log from 'loglevel';

export default class SceneUtils {
    static createPlane(size) {
	const planeGeometry = new THREE.PlaneGeometry(size, size);
	const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -Math.PI / 2;
	return plane;
    }

    static createBox(width, height, depth, color, position) {
	const geometry = new THREE.BoxGeometry(width, height, depth);
	const material = new THREE.MeshBasicMaterial({ color });
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.copy(position);
	return mesh;
    }

    static getIntersectingObjects(raycaster, objects) {
	return raycaster.intersectObjects(objects, true);
    }
}
