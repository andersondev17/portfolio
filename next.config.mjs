// next.config.mjs
const nextConfig = {
    images: {
      domains: ['raw.githubusercontent.com'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      formats: ['image/avif', 'image/webp']
    },
    reactStrictMode: true,
    poweredByHeader: false,
    webpack: (config, { dev, isServer }) => {
      // Modificar la configuración existente
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        }
      }
      return config
    },
    // Habilitar compresión
    compress: true,
    // Optimizar fuentes
    optimizeFonts: true,
    // Optimizaciones adicionales
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true
  };
  
  export default nextConfig;