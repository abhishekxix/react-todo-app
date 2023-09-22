const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js',
	},
	target: 'web',
	devServer: {
		port: '3000',
		static: ['./public'],
		open: true,
		hot: true,
		liveReload: true,
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
};
