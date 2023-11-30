import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import vike from 'vike/plugin'
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { builtinModules } from 'module';


export default {
  plugins: [react(), vike(), tailwindcss()],
  alias: {
    resolve: {
      './runtimeConfig': './runtimeConfig.browser',
    }
  },
  build: {
    rollupOptions: {
      external: [...builtinModules, /^node:/]
    }
  },
  server: {
    proxy: {
      '/admin': {
           target: 'http://host.docker.internal:8000',
           changeOrigin: true,
           secure: false,      
           ws: true,
       },
      '/static': {
           target: 'http://host.docker.internal:8000',
           changeOrigin: true,
           secure: false,      
           ws: true,
       },
      '/api': {
           target: 'http://host.docker.internal:8000',
           changeOrigin: true,
           secure: false,      
           ws: true,
       }
    }
  }
}
