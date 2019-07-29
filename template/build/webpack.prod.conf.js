const path = require('path');
const merge = require('webpack-merge');
const debug = require('debug')('app:config:dev');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const zcyHtmlBaseData = require('@zcy/html-base-data');

debug('合并webpack prod 环境配置');

const commonConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.less$/,
			use: [
				MiniCssExtractPlugin.loader, 
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
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  performance: {
    hints:false     
  },
}

const libConfig = {
  entry: {
		index: './src/index.js',
	},	
  output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../lib'),
		libraryTarget: 'umd'
  },
  externals: ['react', 'react-dom', '@zcy/doraemon'],
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		}),
	]
}

const previewConfig = {
	entry: {
		index: path.join(__dirname, '..', 'examples', 'index.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist'),
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		}),
		new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'examples', 'index.hbs'),
			data: zcyHtmlBaseData,
			chunks: ['index']
    }),
	]
}

const assignLibConfig = Object.assign({}, commonConfig, libConfig);
const assignPreviewConfig = Object.assign({}, commonConfig, previewConfig);

debug('合并webpack prod 环境配置成功');

module.exports = [merge(baseWebpackConfig, assignLibConfig), merge(baseWebpackConfig, assignPreviewConfig)];
