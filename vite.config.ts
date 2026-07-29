import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

// Library build config. Storybook uses its own Vite pipeline and ignores `build`.
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["src"], exclude: ["src/**/*.stories.tsx"] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ComposerUI",
      fileName: "composer-ui",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
