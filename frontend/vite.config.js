import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import vike from 'vike/plugin'

export default {
  plugins: [react(), vike(), tailwindcss()],
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
