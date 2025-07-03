import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
    },
    server: {
      port: env.PORT ? parseInt(env.PORT) : undefined,
      host: true,
    },
    resolve: {
      alias: {
        '@atoms': resolve(__dirname, 'src/atoms'),
        '@molecules': resolve(__dirname, 'src/molecules'),
        '@organisms': resolve(__dirname, 'src/organisms'),
        '@layouts': resolve(__dirname, 'src/layouts'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@styles': resolve(__dirname, 'src/styles'),
      },
    },
  }
})
