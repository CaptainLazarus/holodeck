import { describe, it, expect } from 'vitest';
import SceneManager from '../../../src/js/SceneManager';
import '../../../tests/mocks/three.mock';

describe('SceneManager', () => {
    it('correctly initializes with given properties', () => {
	const sceneManager = new SceneManager();
	expect(sceneManager.boxes).toEqual([]);
    });

    it('correctly adds a box', () => {
	const sceneManager = new SceneManager();
	sceneManager.addBox({ width: 1, height: 1, depth: 1, color: 0xffffff, position: { x: 0, y: 0, z: 0 } });
	expect(sceneManager.boxes.length).toEqual(1);
	expect(sceneManager.boxes[0].width).toEqual(1);
	expect(sceneManager.boxes[0].height).toEqual(1);
	expect(sceneManager.boxes[0].depth).toEqual(1);
	expect(sceneManager.boxes[0].color).toEqual(0xffffff);
	expect(sceneManager.boxes[0].position).toEqual({ x: 0, y: 0, z: 0 });
    })

    it('correctly removes a box', () => {
	const sceneManager = new SceneManager();
	sceneManager.addBox({ width: 1, height: 1, depth: 1, color: 0xffffff, position: { x: 0, y: 0, z: 0 } });
	sceneManager.addBox({ width: 1, height: 1, depth: 1, color: 0xffffff, position: { x: 0, y: 0, z: 0 } });
	sceneManager.removeBox(sceneManager.boxes[0].id);
	expect(sceneManager.boxes.length).toEqual(1);
    });
});
