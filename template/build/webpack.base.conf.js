const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const debug = require('debug')('app:config:base');

debug('创建webpack base配置');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, '../src'),
      doraemon: '@zcy/doraemon',
    },
  },
	module: {
		rules: [{ 
			test: /\.(js|jsx)?$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		},{
      test: /\.hbs$/,
      loader: 'handlebars-loader',
    }]
	},
	plugins: [
		new CleanWebpackPlugin()
	],
	optimization: {
		usedExports: true,
  },
}

debug('webpack base配置创建成功');
