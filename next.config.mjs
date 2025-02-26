/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true
    };

    // fix warnings for async functions in the browser (https://github.com/vercel/next.js/issues/64792)
    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };
    }

    return config;
  }
};

export default nextConfig;
