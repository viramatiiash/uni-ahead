import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "/uni-ahead/",
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes("draft-js")) {
  //           return "draft-editor";
  //         }
  //         if (id.includes("@tanstack/react-query")) {
  //           return "react-query";
  //         }
  //       },
  //     },
  //   },
  // },
  plugins: [
    // viteCompression({
    //   algorithm: "gzip",
    //   threshold: 1024,
    //   ext: ".gz",
    // }),
    svgr({
      svgrOptions: {
        icon: true,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
    react(),
  ],
  css: {
    modules: {
      generateScopedName: "[local]__[hash:base64:5]",
    },
  },
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@images": "/src/assets/images",
      "@store": "/src/store",
      "@": "/src",
      "@pages": "/src/pages",
      "@routes": "/src/routes",
      "@styles": "/src/styles",
      "@icons": "/src/assets/icons",
      "@components": "/src/components",
      "@interfaces": "/src/interfaces",
      "@constants": "/src/constants",
    },
  },
  define: {
    global: "window",
  },
});
