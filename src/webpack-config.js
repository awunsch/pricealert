var path = require('path');
var webpack = require('webpack');

module.exports = function(prod) {
  var plugins = [];
  var entry = [ "./js/index" ];

  if (! prod) {
    plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("development"),
    }));
  } else {
    plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production"),
    }));
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true, }));
  }

  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loaders: ['babel-loader'],
          exclude: [ /node_modules/]
        },
        {
          test: /\.less$/,
          loaders: ['style-loader', 'css-loader?module', 'less-loader' ]
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/,
          loaders: ['svg-react-loader']
        },
        {
          test: /\.json$/,
          loaders: ['json-loader']
        }
      ]
    },

    entry: {
      app: entry
    },

    resolve: {
      modules: ['./js', './css', 'node_modules'],
      extensions: ['.js', '.jsx', '.css']
    },

    output: {
      filename: 'pricealert.js',
      path: path.resolve('./build/'),
      publicPath: '/'
    },
    plugins: plugins,
    devtool: 'source-map'
  };
};
