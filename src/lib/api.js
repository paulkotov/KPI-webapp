// import initStore from '../redux/store';
// import * as authActions from '../redux/actions/auth';
// let store = initStore();

import { server, port } from './config';

function isObjEmpty(obj){
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
} 

// function rules(obj){
//   let rules = ['all'];

// }

function isUserUnLogged(){
  return window.localStorage.getItem('user') === null;
}

async function getUser(user, pass){
  const response = await fetch(`https://${server}:${port}/api/v1/auth/login`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify({ login: user, password: pass })
  });
  const data = await response.json();
  if (data.token){
    const token = data.token;
    const userProfile = await fetch(`https://${server}:${port}/api/v1/user/1`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Authorization' : token
      }
    });
    const profile = await userProfile.json();
    return profile;
  }
  return null;
}

async function loadUsers(token){
  const response = await fetch(`https://${server}:${port}/api/v1/user`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function loadStructData(token){
  // const user = await store.dispatch(authActions.getCurrentUser);
  // const data = await getUser(user.userName, user.password);
  const response = await fetch(`http://${server}:${port}/api/v1/department`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

async function loadPlanData(token){
  // const user = await store.dispatch(authActions.getCurrentUser);
  // const data = await getUser(user.userName, user.password);
  const response = await fetch(`https://${server}:${port}/api/v1/plan`, {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Authorization' : token
    }
  });
  const data = await response.json();
  return data;
}

function loadDataFile(event){
  let file = event.target.files[0];
  let fileReader = new FileReader();
    
  fileReader.onload = fileEvent => {
    console.log(fileEvent);
  };

  fileReader.readAsDataURL(file);
  return true;
}

export { isUserUnLogged, isObjEmpty, getUser, loadUsers, loadStructData, loadPlanData, loadDataFile };
