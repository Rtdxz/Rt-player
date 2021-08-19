const path = require('path');

const alias = require('./config/alias.ts');
const { rootPath } = require('./config/utils.ts');

module.exports = {
  chainWebpack: (config) => {
    // alias
    Object.keys(alias).forEach((val) => {
      config.resolve.alias.set(val, path.resolve(rootPath, alias[val]));
    });
  },
  devServer: {
    proxy: {
      // '': {     //这里最好有一个 /
      //   target: 'https://autumnfish.cn/',  // 后台接口域名
      //   ws: true,        //如果要代理 websockets，配置这个参数
      //   secure: true,  // 如果是https接口，需要配置这个参数
      //   changeOrigin: true,  //是否跨域
      //   // pathRewrite:{
      //   //     '^/rng':''
      //   // }
      // }
      '': {     //这里最好有一个 /
        target: 'http://localhost:3000',  // 后台接口域名
        ws: true,        //如果要代理 websockets，配置这个参数
        // secure: true,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        // pathRewrite:{
        //     '^/rng':''
        // }
      }
    },
    hot: true,//自动保存
    open: true,//自动启动
    port: 8080,//默认端口号
    host: "0.0.0.0"
  }
};
