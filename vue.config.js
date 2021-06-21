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
};
