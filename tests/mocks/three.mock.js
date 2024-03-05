// tests/mocks/three.mock.js
import { vi } from 'vitest';

vi.mock('three', () => ({
  Mesh: vi.fn().mockImplementation(() => ({
    geometry: {},
    material: { color: {} },
    position: { set: vi.fn() },
  })),
  BoxGeometry: vi.fn(),
  MeshBasicMaterial: vi.fn(),
  Color: vi.fn().mockImplementation((color) => ({ color })),
  // Add other mocks as necessary
}));
