import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    // Load semua env yang diawali VITE_ sesuai mode (development / production)
    const env = loadEnv(mode, process.cwd(), '')

    return {
        base: env.VITE_APP_FRONTEND_USER_URL?.includes('ngrok') ? '/user/' : '/',
        plugins: [react()],
        server: {
            host: true,
            port: 5173,
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
        },
        optimizeDeps: {
            include: ['zustand'],
        },
    }
})
