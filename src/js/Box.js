import * as THREE from 'three';

export default class Box {
    constructor(width, height, depth, color, position) {
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.color = color;
	this.position = position;
	this.mesh = this.createMesh();
	this.id = this.mesh.uuid;
    }

    createMesh() {
	const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
	const material = new THREE.MeshBasicMaterial({ color: this.color });
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(this.position.x, this.position.y, this.position.z);
	return mesh;
    }

    updateColor(newColor) {
	this.color = newColor;
	this.mesh.material.color.set(newColor);
    }
}
