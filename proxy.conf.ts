const PROXY_CONF = [{
  context: ['/api/v1'],
  target: 'https://617c48c4d842cf001711c2fc.mockapi.io/',
  secure: false,
  logLevel: 'debug',
  // pathRewrite: { '^/api' : '' }
}] ;
// tslint:disable-next-line:align
module.exports = PROXY_CONF;
