import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
} from '../actions/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('player') ? true : false,
  player: JSON.parse(localStorage.getItem('player') || '{}'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        player: action.player,
        message: action.message,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };
    case LOGIN_LOGOUT:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        player: null,
      }
    default:
      return state;
  }
};