// Path: tests/src/js/Box.test.js
import { describe, it, expect } from 'vitest';
import Box from '../../../src/js/Box'; // Adjust the import path to go up from tests/src/js to src/js
import '../../../tests/mocks/three.mock'; // Ensure the path to your mocks is correct, relative to this test file

describe('Box', () => {
  it('correctly initializes with given properties', () => {
    const box = new Box(1, 2, 3, 0xffffff, { x: 1, y: 2, z: 3 });
    expect(box.width).toBe(1);
    expect(box.height).toBe(2);
    expect(box.depth).toBe(3);
    expect(box.color).toBe(0xffffff);
    expect(box.position).toEqual({ x: 1, y: 2, z: 3 });
  });

  it('updates color correctly', () => {
    const box = new Box(1, 2, 3, 0xffffff, { x: 0, y: 0, z: 0 });
    box.updateColor(0x000000);
    expect(box.color).toBe(0x000000);
  });
});
