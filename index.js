const safeProtocol = require('./protocols/safe_protocol');
const safeApi = require('./src/api');

module.exports = {
  configure (opts) {},
  homePages: [{
    label: 'SAFE Network',
    href: 'https://safenetforum.org/t/safe-network-alpha-release/10687/1'
  }],
  protocols: [safeProtocol],
  webAPIs: safeApi
};
