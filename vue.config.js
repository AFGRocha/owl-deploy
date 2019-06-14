module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/owl-deploy/'
      : '/'
  }