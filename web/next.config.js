module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    })
    if (!isServer) {
      config.node = {
        fs: "empty",
      }
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: true, // Dangerous; make sure to typecheck before build/run/deploy
  },
}
