import * as safeAuth from '../ffi/safe_auth';

export default [
  {
    name: 'safeAuth',
    isInternal: true,
    manifest: safeAuth.manifest,
    methods: safeAuth
  }
];
