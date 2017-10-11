const path = require('path');
const nodeExternals = require('webpack-node-externals');
const buildPath = path.join(__dirname, 'build');

module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    path: path.join(buildPath),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  externals: [nodeExternals()],
};
