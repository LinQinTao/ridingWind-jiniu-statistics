const webpack = require('webpack');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: [
    // 'babel-polyfill',
    path.resolve(__dirname, './src/app.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'app.min.js',
    library: 'ridingwind-jiniu-base',
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
          presets:['latest','stage-0', 'react']
        }
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?minimize&importLoaders=1&module&camelCase&localIdentName=[hash:base64:5]!postcss-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: 'images/[name].[hash:6].[ext]',
        },
      },
    ],
  },
  externals: {
    react: 'umd react',
    'react-dom': 'umd react-dom',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new BundleAnalyzerPlugin(),
  ],
  devtool: 'source-map',
};
