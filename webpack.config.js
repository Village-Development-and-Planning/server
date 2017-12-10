const path = require('path');
const nodeExternals = require('webpack-node-externals');
const buildPath = path.join(__dirname, 'build');

const procTemplate = './src/procs/process-runner.js';
const procs = ['survey-response'].reduce(
  (acc, p) => {
    acc[`procs/${p}`] = [
      `expose-loader?Proc!./src/procs/${p}.proc.js`,
      procTemplate,
    ];
    return acc;
  },
  {},
);
module.exports = {
  entry: {
    server: './src/app.js',
    ...procs,
  },
  target: 'node',
  node: {
    __dirname: true,
  },
  output: {
    path: path.join(buildPath),
    filename: '[name].js',
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
