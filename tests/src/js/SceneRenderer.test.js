import { describe, it, vi, beforeEach, expect } from 'vitest';
import * as THREE from 'three';
import SceneRenderer from '../../../src/js/SceneRenderer';
import SceneManager from '../../../src/js/SceneManager';
import { JSDOM } from 'jsdom';

// Mock THREE and other dependencies
vi.mock('three', async (importOriginal) => {
    const actual = await importOriginal();
    const mockRender = vi.fn();
    const mockSetSize = vi.fn();

    const mockScene = vi.fn().mockImplementation(() => ({
        add: vi.fn(),
        children: [],
        background: new THREE.Color(),
    }));

    // Update mock for PerspectiveCamera to include position.clone
    const mockPerspectiveCamera = vi.fn().mockImplementation(() => ({
        position: {
            set: vi.fn(),
            clone: vi.fn(() => ({
                x: 0, y: 0, z: 500, // Example position; adjust as needed for your tests
                set: vi.fn(), // Include set if needed for other tests
            })),
        },
        aspect: 0,
        updateProjectionMatrix: vi.fn(),
    }));

    return {
        ...actual,
        WebGLRenderer: vi.fn().mockImplementation(() => ({
            domElement: document.createElement('div'),
            setSize: mockSetSize,
            render: mockRender,
        })),
        Scene: mockScene,
        PerspectiveCamera: mockPerspectiveCamera,
        Color: vi.fn().mockImplementation(() => ({})),
        // Include any other mocks needed for your tests
    };
});


// Mock SceneUtils and other utils if needed

// Set up a mock DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="cameraInfo"></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;

describe('SceneRenderer', () => {
    let sceneRenderer;
    let sceneManager;
    let container;

    beforeEach(() => {
        sceneManager = new SceneManager();
        sceneManager.addBox({ width: 10, height: 20, depth: 30, color: 0xff0000, position: new THREE.Vector3(1, 2, 3) });
        sceneManager.addBox({ width: 40, height: 50, depth: 60, color: 0xff0000, position: new THREE.Vector3(4, 5, 6) });
        
        container = document.createElement('div');
        sceneRenderer = new SceneRenderer(sceneManager, container);
    });

    it('should properly initialize SceneRenderer', () => {
        expect(sceneRenderer.sceneManager).toBe(sceneManager);
        expect(sceneRenderer.container).toBe(container);
        expect(THREE.Scene).toHaveBeenCalledTimes(1);
        expect(THREE.WebGLRenderer).toHaveBeenCalledTimes(1);
        expect(sceneRenderer.renderer.setSize).toHaveBeenCalledWith(window.innerWidth, window.innerHeight);
        expect(container.firstChild).toBe(sceneRenderer.renderer.domElement);
    });

    it('should add box on handlePlaneClick', () => {
        // Assuming you've mocked necessary methods in SceneUtils and THREE.Raycaster for this to work
        const addBoxSpy = vi.spyOn(sceneManager, 'addBox');
        const mockEvent = { clientX: 100, clientY: 200 };
        sceneRenderer.handleClick(mockEvent);

        expect(addBoxSpy).toHaveBeenCalledTimes(1);
        expect(addBoxSpy).toHaveBeenCalledWith(expect.objectContaining({
            width: 50,
            height: 50,
            depth: 50,
            color: 0xff0000,
        }));
    });

    // More tests can be added as needed
});
