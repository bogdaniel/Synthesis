export default function getBaseURL() {
  return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : '/';
}
