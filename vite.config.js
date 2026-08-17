import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import versionPlugin from './src/utils/viteVersionPlugin.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), versionPlugin()],
})
