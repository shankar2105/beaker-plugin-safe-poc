/* @flow */

import { protocol } from 'electron';
import url from 'url';
import mime from 'mime';
import { getFile } from '../src/ffi/safe_dns';

const SAFE_SCHEME = 'safe';

const parseSafeUrl = (safeUrl: string): { service: string, longName: string, filePath: string, fileName: string } => {
  const parsedUrl = url.parse(safeUrl);
  const host: string = parsedUrl.host.split('.');

  const filePath: string = parsedUrl.path[0] === '/' ? parsedUrl.path.slice(1) : parsedUrl.path;
  const fileName: string = filePath.split('/').slice(-1)[0];

  let service: string = host[0];
  let longName: string = host[1];

  if ((host.length === 1) || (host.length === 2 && host[1] === 'safenet')) {
    service = 'www';
    longName = host[0];
  }

  return {
    service,
    longName,
    filePath,
    fileName
  };
};

// const testUrl = parseSafeUrl('safe://test.shankar-test.safenet/test/index.html#hashtext?q=test1');
// console.log(testUrl, mime.lookup(testUrl.fileName));

const registerSafeProtocol = () => {
  protocol.registerBufferProtocol(SAFE_SCHEME, (req, cb) => {
    const parsedUrl = parseSafeUrl(req.url);
    getFile(parsedUrl.longName, parsedUrl.service, parsedUrl.filePath)
      .then((res) => {
        cb({ mimeType: mime.lookup(parsedUrl.fileName), data: res });
      })
      .catch((err) => {
        // TODO Handle Error
      });
  }, (error) => {
    if (error) console.error('Failed to register protocol');
  });
};

module.exports = {
  scheme: SAFE_SCHEME,
  label: 'SAFE Network',
  isStandardURL: true,
  isInternal: true,
  register: registerSafeProtocol
};
