import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { adminApiPlugin } from './tools/admin-api-plugin'

export default defineConfig({
  plugins: [react(), adminApiPlugin()],
})
