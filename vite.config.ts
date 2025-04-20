import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Validate environment variables
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = mode;
  }

  return {
    server: {
      host: "::",
      port: 8080,
      strictPort: true, // Prevent automatic port fallback
      open: mode === 'development', // Auto-open browser in dev
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react', // If using Emotion
        devTarget: 'es2022', // Modern dev target
      }),
      mode === 'development' && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022', // Modern JS target
        supported: { 
          'top-level-await': true // Enable modern features
        },
      },
    },
    build: {
      target: 'es2022',
      minify: 'terser', // Better minification
      sourcemap: mode === 'development',
    },
    css: {
      devSourcemap: true, // Better CSS debugging
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [], // Clean prod builds
    },
  };
});
