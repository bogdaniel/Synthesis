import 'whatwg-fetch';
import getBaseURL from './baseURL';

const baseUrl = getBaseURL();

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}

function get(url) {
  return fetch(baseUrl + url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(onSuccess, onError);
}

function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE',
  });

  return fetch(request).then(onSuccess, onError);
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

export function getUsers() {
  return get('users');
}
