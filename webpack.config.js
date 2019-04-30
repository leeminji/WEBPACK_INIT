var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebPackPlugin = require("html-webpack-plugin");

//이미지 최소화 설정
var ImageminPlugin = require("imagemin-webpack");
var imageminJpegtran = require("imagemin-jpegtran"); //jpg
var imageminOptipng = require("imagemin-optipng"); //png

module.exports = {
	plugins : [
		new MiniCssExtractPlugin({
			filename : './public/css/style.css'
		}),
		new HtmlWebPackPlugin({
			template : './src/index.html',
			filename : './index.html'
		}),
		new ImageminPlugin({
			bail : false,
			cache : true,
			imageminOptions : {
				plugins : [
					imageminOptipng({
						optimizationLevel: 5
					}),
					imageminJpegtran({
						progressive: true
					})
				]
			}
		})
	],
	entry: './src/index.js',
	output : {
		path : path.resolve(__dirname, 'dist'),
		filename : './public/js/main.js'
	},
	module : {
		rules : [
			{
				test : /\.(js)$/,
				exclude : /node_modules/,
				use : {
					loader : 'babel-loader',
					options : {
						presets : ['@babel/preset-env']
					}
				}
			},
			{
				test : /\.(png|svg|jpe?g|gif)$/i,
				use : [{
					loader : 'file-loader',
					query : {
						name: './public/images/[name].[ext]'
					}
				}],
			},
			{
				test : /\.(woff|woff2|eot|otf)$/,
				use : [{
					loader : 'file-loader',
					query : {
						name : './public/fonts/[name].[ext]'
					}
				}]
			},
			{
				test : /\.(scss)$/,
				//use : ['style-loader','css-loader','sass-loader']
				use : [
					{
						loader : MiniCssExtractPlugin.loader,
						options : {
							publicPath : '../'
						}
					},
					'css-loader', 'sass-loader'
				]
			}
		],
	}
}