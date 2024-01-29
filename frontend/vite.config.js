import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import vike from "vike/plugin";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { builtinModules } from "module";

export default {
  plugins: [
    react(),
    vike({
      prerender: true,
    }),
    tailwindcss(),
  ],
  alias: {
    resolve: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    rollupOptions: {
      external: [...builtinModules, /^node:/],
    },
  },
  server: {
    proxy: {
      "/admin": {
        target: "http://host.docker.internal:8000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/static": {
        target: "http://host.docker.internal:8000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/api": {
        target: "http://host.docker.internal:8000",
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log(proxyReq, req);
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
};
