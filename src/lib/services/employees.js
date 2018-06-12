import { protocol, server, port } from '../lib/config';

const token = window.localStorage.getItem('user');

async function loadEmplData(){
    // const user = await store.dispatch(authActions.getCurrentUser);
    // const data = await getUser(user.userName, user.password);
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/plan`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function addEmpl(employee) {
  const response = await fetch(`${protocol}://${server}:${port}/api/v1/worker`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Authorization' : token
    },
    body: JSON.stringify(employee)
  });
  const data = await response.json();
  return data;
}
export { loadEmplData, addEmpl };