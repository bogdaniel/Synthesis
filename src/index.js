import { deleteUser, getUsers } from './api/userApi';
import './index.css';

// Populate table of users via API call
getUsers().then((result) => {
  let usersBody = '';

  result.forEach((user) => {
    usersBody += `
      <tr>
        <td><a href="#" data-id="${user.id}" class="delete-user">Delete</a></td>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
      </tr>
    `;
  });

  global.document.getElementById('users').innerHTML = usersBody;


  const deleteLinks = global.document.getElementsByClassName('delete-user');
  // Must use array.from to create a real array from a DOM collection
  // getElementsByClassName only returns an "array like" object
  Array.from(deleteLinks).forEach((index) => {
    const link = index;
    link.onclick = function delUser(event) {
      const element = event.target;

      event.preventDefault();

      deleteUser(element.attributes['data-id'].value);

      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
