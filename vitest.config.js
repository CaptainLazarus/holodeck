import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // This makes `vi` available globally in tests
    environment: 'jsdom',
  },
});
