const safeProtocol = require('./dist/protocol');
const safeApi = require('./dist/api');

module.exports = {
  configure (opts) {},
  homePages: [{
    label: 'SAFE Network',
    href: 'https://safenetforum.org/t/safe-network-alpha-release/10687/1'
  }],
  protocols: [safeProtocol],
  webAPIs: safeApi
};
