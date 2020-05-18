const path = require('path')
const resolve = function(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './' : './',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false, // 是否开启eslint保存检测
	productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@page', resolve('src/pages'))
		config.optimization.runtimeChunk('single')
	},
	configureWebpack: {
		devServer: {
			proxy: {
				'/api': {
					//target: 'http://10.12.70.72:8762',//深圳服务器
					target: 'http://222.128.2.151:8762',
					changeOrigin: true, //是否跨域
					pathRewrite: {
						'^/api': '' //规定请求地址以什么作为开头
					}
				}
			}
		},
		// 百度地图需要添加的配置
		externals: {
			"BMap": "BMap",
			'BMap_Symbol_SHAPE_POINT': 'BMap_Symbol_SHAPE_POINT'
		},
	}
}
