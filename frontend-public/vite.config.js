import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_APP_FRONTEND_PUBLIC_URL.includes('ngrok') ? '/public/' : '/',
    plugins: [react()],
    server: {
      host: true, // Penting agar Vite bisa diakses dari Docker network (oleh Nginx)
      port: 5173, // Ini port Vite di dalam container frontend-public,
      strictPort: true,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        '.iamra.site',
        '.ngrok-free.app'
      ],
      hmr: {
        host: 'localhost',
        protocol: 'ws',
        clientPort: 80
      },
      watch: {
        usePolling: true
      }
    }
  }
})
