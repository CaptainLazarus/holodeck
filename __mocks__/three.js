export const Vector3 = jest.fn().mockImplementation(() => ({
  set: jest.fn(),
}));

export const PerspectiveCamera = jest.fn().mockImplementation(() => ({
  position: new Vector3(),
  lookAt: jest.fn(),
}));

