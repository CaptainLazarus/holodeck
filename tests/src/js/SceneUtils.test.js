import { describe, it, vi, beforeEach, expect } from 'vitest';
import * as THREE from 'three';
import SceneUtils from '../../../src/js/SceneUtils';
import { JSDOM } from 'jsdom';

describe('SceneUtils', () => {
    it('should create a plane with correct geometry and material', () => {
	const plane = SceneUtils.createPlane(1000);
	expect(plane).toBeInstanceOf(THREE.Mesh);
	expect(plane.geometry).toBeInstanceOf(THREE.PlaneGeometry);
	expect(plane.geometry.parameters.width).toBe(1000);
	expect(plane.geometry.parameters.height).toBe(1000);
	expect(plane.material).toBeInstanceOf(THREE.MeshBasicMaterial);
	expect(plane.material.color.getHex()).toBe(0xcccccc);
	expect(plane.rotation.x).toBe(-Math.PI / 2);
    });

    it('should create a box with correct geometry, material, and position', () => {
	const position = new THREE.Vector3(1, 2, 3);
	const box = SceneUtils.createBox(10, 20, 30, 0xff0000, position);
	expect(box).toBeInstanceOf(THREE.Mesh);
	expect(box.geometry).toBeInstanceOf(THREE.BoxGeometry);
	expect(box.geometry.parameters.width).toBe(10);
	expect(box.geometry.parameters.height).toBe(20);
	expect(box.geometry.parameters.depth).toBe(30);
	expect(box.material).toBeInstanceOf(THREE.MeshBasicMaterial);
	expect(box.material.color.getHex()).toBe(0xff0000);
	expect(box.position).toEqual(position);
    });

    it('should get intersecting objects from a raycaster', () => {
	const object1 = new THREE.Mesh();
	const object2 = new THREE.Mesh();
	const objects = [object1, object2];
	const raycaster = new THREE.Raycaster();
	const intersects = SceneUtils.getIntersectingObjects(raycaster, objects);
	expect(intersects).toEqual(raycaster.intersectObjects(objects, true));
    });
});
