import loadScript from "load-script2";

export async function browserLoadRemote(remoteConfig) {
  const { scope, module, url } = remoteConfig;
  await loadScript(url);
  await __webpack_init_sharing__("default");
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  const Module = await factory();
  return Module;
}

export async function nodeLoadRemote(remoteConfig) {
  const { scope, module, file } = remoteConfig;
  const container = __non_webpack_require__(file);
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const Module = await factory();
  return Module;
}
