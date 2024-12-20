import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // perEnvironmentPlugin({
    //   VITE_NOVU_APP_IDENTIFIER: '',
    //   VITE_NOVU_BACKEND_URL: '',
    //   VITE_NOVU_APP_SUBSCRIBER_ID: ''
    // })
  ],
})
