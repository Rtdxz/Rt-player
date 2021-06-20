import fs from 'fs';

const rootPath = fs.realpathSync(process.cwd());

module.exports = {
  rootPath, // 项目根目录
};
