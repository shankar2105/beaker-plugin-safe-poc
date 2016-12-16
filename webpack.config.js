import path from 'path';

export default {
  entry: {
    api: path.resolve(__dirname, 'src', 'api', 'index.js'),
    protocol: path.resolve(__dirname, 'protocols', 'safe_protocol.js')
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  externals: {
    fs: 'fs',
    electron: 'electron'
  }
};
