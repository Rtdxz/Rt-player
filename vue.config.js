import path from 'path';
import alias from './config/alias';
import rootPath from './config/utils';

module.exports = {
  chainWebpack: (config) => {
    // alias
    Object.keys(alias).forEach((val) => {
      config.resolve.alias.set(val, path.resolve(rootPath, alias[val]));
    });
  },
};
