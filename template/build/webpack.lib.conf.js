const path = require('path');
const merge = require('webpack-merge');
const debug = require('debug')('app:config:dev');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const pkg = require('../package.json');

pkg.dependencies['@zcy'] = '';
pkg.dependencies.doraemon = '';
debug('合并webpack prod 环境配置');

const commonConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader?modules',
          options: {
            importLoaders: 2,
          },
        },
        'postcss-loader',
        'less-loader',
      ],
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader?modules',
        'postcss-loader',
      ],
    }],
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  performance: {
    hints: false,
  },
};

const libConfig = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib'),
    libraryTarget: 'umd',
  },
  externals: Object.keys(pkg.dependencies).map(pkgName => (context, request, callback) => {
    // 逻辑：以模块名 pkgName 开始的引用都将视为外部模块
    request.indexOf(pkgName) === 0 ? callback(null, request) : callback();
  }),
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};


const assignLibConfig = Object.assign({}, commonConfig, libConfig);

debug('合并webpack prod 环境配置成功');

module.exports = [merge(baseWebpackConfig, assignLibConfig)];
