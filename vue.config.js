const path = require('path');

const alias = require('./config/alias');
const { rootPath } = require('./config/utils');

module.exports = {
  chainWebpack: (config) => {
    // alias
    Object.keys(alias).forEach((val) => {
      config.resolve.alias.set(val, path.resolve(rootPath, alias[val]));
    });
  },
  devServer : {
    hot:true,//自动保存
    open : true,//自动启动
    port : 8080,//默认端口号
    host : "0.0.0.0"
}
};
