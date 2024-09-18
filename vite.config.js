import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: '../airdnd-backend/public',
		emptyOutDir: true,
	},
	server: {
		proxy: {
			'/api/pexels': {
				target: 'https://api.pexels.com', // The target URL (Pexels API)
				changeOrigin: true, // Changes the origin of the host header to the target URL
				rewrite: path => path.replace(/^\/api\/pexels/, ''), // Rewrites the URL
				headers: {
					Authorization: `Bearer ${process.env.VITE_PEXELS_API_KEY}` // Include your API key
				}
			}
		}
	}
})
