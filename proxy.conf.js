const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://time-to-move-14d11-default-rtdb.firebaseio.com',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
  }
];

module.exports = PROXY_CONFIG;
