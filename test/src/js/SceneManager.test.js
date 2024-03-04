import { describe, it, expect } from 'vitest';
import { SceneManager } from '../../../src/js/SceneManager';

import { vi } from 'vitest';

vi.mock('three/src/renderers/WebGLRenderer', () => {
  return {
    WebGLRenderer: vi.fn().mockImplementation(() => ({
      domElement: document.createElement('canvas'),
      setSize: vi.fn(),
      render: vi.fn(),
      // Add any methods you need to mock here
    })),
  };
});

vi.stubGlobal('HTMLCanvasElement.prototype.getContext', () => ({
  // Mock or stub the functions and properties you access on the context
}));

describe('SceneManager', () => {
  it('should initialize correctly', () => {
    const container = document.createElement('div');
    const sceneManager = new SceneManager(container);
    // expect(sceneManager).toBeDefined();
  });
});
