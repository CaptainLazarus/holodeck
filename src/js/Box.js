import * as THREE from 'three';

export default class Box {
  constructor(width = 60, height = 30, depth = 30, color = 0x000000, position = {x: 0, y: 0, z: 0}) { // Default color changed to black
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({color});
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(position.x, position.y, position.z);
  }
}
