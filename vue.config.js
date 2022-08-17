const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  devServer: {
    proxy: {
      '/': {
        target: 'http://api.vikingship.xyz/api', // 这里填入你要请求的接口的前缀
        ws: false, // 代理websocked
        changeOrigin: true, // 虚拟的站点需要更管origin
        secure: false // 是否https接口
        // pathRewrite: {
        //   '^/': '/'// 重写路径
        // }
      }
    }
  }

})
