import { User } from '../components/Login/Login';
import store from '../store/index';
import { login as loginReducer } from '../store/slices/userSlice';

const API_BASE_URL = 'http://localhost:3002';

export async function register(user: User) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function login(user: User) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    const res = await fetch(`${API_BASE_URL}/user/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function checkAuth() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth`, {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      store.dispatch(loginReducer({id: data.id, username: data.username}))
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
