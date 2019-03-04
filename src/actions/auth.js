import api from '../api';
import { removeLocalStore, setLocalStore } from '../util';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function receiveLogin(player) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    player,
    message: null,
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    player: null,
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    const post = await api.post('/login', { username, password });

    if (post.status >= 400) {
      dispatch(loginError(post.result.error || 'Error'))
    }

    if (post.status === 200) {
      const { player } = post.result;
      setLocalStore('player', player);
      dispatch(receiveLogin(player));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    removeLocalStore('player');
    dispatch(logout());
  }
}