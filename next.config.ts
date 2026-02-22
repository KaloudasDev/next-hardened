import type { NextConfig } from "next";
import type { Compiler, WebpackPluginInstance, Compilation } from "webpack";
import type { Hash } from "crypto";

const nextConfig: NextConfig = {
  turbopack: {
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
    reactRemoveProperties: true,
  },
  
  images: {
    unoptimized: true,
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    remotePatterns: [],
    deviceSizes: [],
    imageSizes: [],
  },
  
  experimental: {
    reactCompiler: true,
    optimizeCss: true,
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
    disableOptimizedLoading: true,
  },
  serverExternalPackages: [],
  
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      if (config.output && typeof config.output !== 'function') {
        config.output.filename = 'static/chunks/[contenthash].js';
        config.output.chunkFilename = 'static/chunks/[contenthash].js';
      }
      
      if (config.optimization) {
        config.optimization.moduleIds = 'deterministic';
        config.optimization.chunkIds = 'deterministic';
        config.optimization.minimize = true;
        config.optimization.usedExports = true;
        config.optimization.concatenateModules = true;
        
        if (config.optimization.minimizer) {
          config.optimization.minimizer = config.optimization.minimizer.map((plugin: unknown) => {
            if (plugin && typeof plugin === 'object' && 'options' in (plugin as object)) {
              const terserPlugin = plugin as { options?: { terserOptions?: { format?: { comments: boolean } } } };
              if (terserPlugin.options?.terserOptions) {
                terserPlugin.options.terserOptions.format = { comments: false };
              }
            }
            return plugin;
          });
        }
      }
      
      if (config.module?.rules) {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[contenthash][ext]',
          },
        });
      }
      
      if (config.plugins) {
        config.plugins.push({
          apply: (compiler: Compiler) => {
            compiler.hooks.emit.tap('RemoveComments', (compilation: Compilation) => {
              Object.keys(compilation.assets).forEach((asset: string) => {
                if (asset.endsWith('.js')) {
                  const source = compilation.assets[asset].source();
                  const withoutComments = source.toString().replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
                  compilation.assets[asset] = {
                    source: () => withoutComments,
                    size: () => withoutComments.length,
                    map: () => null,
                    sourceAndMap: () => ({ source: withoutComments, map: null }),
                    updateHash: (hash: Hash) => hash.update(withoutComments),
                    buffer: () => Buffer.from(withoutComments),
                  };
                }
              });
            });
          },
        } as WebpackPluginInstance);
      }
    }
    return config;
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Powered-By', value: '' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { 
            key: 'Content-Security-Policy', 
            value: [
              "default-src 'none'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
              "block-all-mixed-content"
            ].join('; ')
          },
        ],
      },
    ];
  },
};

export default nextConfig;