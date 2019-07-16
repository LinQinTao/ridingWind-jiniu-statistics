const webpack = require('webpack');
const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: [
    // 'babel-polyfill',
    path.resolve(__dirname, './src/app.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'app.min.js',
    library: 'ridingWind-jiniu-statistics',
    libraryTarget: 'umd',
    publicPath: '/',
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        query:{
          presets:['latest']
        }
      },
    ],
  },
  externals: {
    axios: 'umd axios',
    'url-search-params-polyfill': 'umd url-search-params-polyfill',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    // new BundleAnalyzerPlugin(),
  ],
  devtool: 'source-map',
};
