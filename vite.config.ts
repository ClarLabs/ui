import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	root: './demo',
	publicDir: false,
	server: {
		port: 3000,
		open: true
	},
	css: {
		modules: {
			localsConvention: 'camelCase',
			generateScopedName: '[local]__[hash:base64:5]'
		}
	}
})
