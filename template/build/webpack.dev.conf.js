const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const debug = require('debug')('app:config:dev');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const zcyHtmlBaseData = require('@zcy/html-base-data');
const apiMocker = require('webpack-api-mocker');

debug('合并webpack dev 环境配置');

const devConfig = {
  mode: 'development',
  entry: {
    index: ['react-hot-loader/patch', path.join(__dirname, '..', 'examples', 'index.js')],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
		path: path.resolve(__dirname, '../lib')
	},
	devtool: 'cheap-module-eval-source-map',
	module: {
		rules: [{
			test: /\.less$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
        'postcss-loader',
        'less-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
  },
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, '..', 'lib'),
    historyApiFallback: true,
    compress: true,
    open: true, // 服务启动后 打开浏览器
    hot: true,
    inline: true,
    hotOnly: true,
    before(app) {
      apiMocker(app, path.resolve('./mockData/index.js'),
        {
          proxy: {
            "/oauth/*": "http://login.test.cai-inc.com",
            "/user/*": "http://middle.test.cai-inc.com"
          }
        }
      )
    }
  },
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'examples', 'index.hbs'),
      inject: true,
      data: zcyHtmlBaseData,
    }),
  ],
  optimization: {
		splitChunks: {
      chunks: 'all'
    }
  },
}

debug('合并webpack dev 环境配置成功');

module.exports = merge(baseWebpackConfig, devConfig);
