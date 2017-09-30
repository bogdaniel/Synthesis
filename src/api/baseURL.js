function getQueryStringParameterByName(name, url) {
  const n = name;
  let uri = url;
  if (!uri) uri = window.location.href;

  const replace = n.replace(/[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${replace}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(uri);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function getBaseUrl() {
  return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : '/';
}
