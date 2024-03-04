import { vi } from 'vitest';

// Mock the getContext method to return a minimal WebGL context
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: vi.fn().mockReturnValue({
    // Mock WebGLRenderingContext methods and properties
    getExtension: vi.fn().mockReturnValue({}),
    // Add more mocked methods and properties as needed
    // For example:
    createBuffer: vi.fn(),
    bindBuffer: vi.fn(),
    bufferData: vi.fn(),
    createProgram: vi.fn(),
    createShader: vi.fn(),
    shaderSource: vi.fn(),
    compileShader: vi.fn(),
    getShaderParameter: vi.fn(),
    getShaderInfoLog: vi.fn(),
    attachShader: vi.fn(),
    linkProgram: vi.fn(),
    getProgramParameter: vi.fn(),
    getUniformLocation: vi.fn(),
    useProgram: vi.fn(),
      uniformMatrix4fv: vi.fn(),
      getParameter: vi.fn(),
  }),
});
