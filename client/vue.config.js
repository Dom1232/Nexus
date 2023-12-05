const { defineConfig } = require('@vue/cli-service')

const { PORT = 3000 } = process.env;

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../dist/app',

  devServer: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      '/auth': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      '/comment': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      '/posts': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },

})
