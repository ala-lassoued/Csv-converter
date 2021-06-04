module.exports = {
  watch: true,
  devServer: {
    inline: false,
    contentBase: "./dist",
},
    entry: __dirname + '/client/src/index.jsx',
    module: {
      rules: [
        {
          test: [/\.jsx$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        }
      ]
    },
     output: {
      filename: 'bundle.js',
      path: __dirname + '/client/dist'
    }, performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
  }
  };