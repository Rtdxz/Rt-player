module.exports = {
  plugins: {
    // to edit target browsers: use "browserslist" field in package.json
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 72,
      // unitPrecision: 5,//保留两位小数
      propList: ['*'],
      minPixelValue: 1.1 //所有小于设置的样式都不被转换
    }
  }
}
