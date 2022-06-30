import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGOUT,
    REGISTERTEACHER_SUCCESS,
    REGISTERTEACHER_FAILURE
  } from "../actions/actionTypes";

  const initialAuthState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    isStudent:true,
    name:""
  };

  export default function(state = initialAuthState, action) {
    switch (action.type) {

      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
      case REGISTERTEACHER_SUCCESS:
        localStorage.setItem("token", action.payload.token);
        console.log(action.payload)
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };

      case REGISTER_FAIL:
      case REGISTERTEACHER_FAILURE:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
        };

      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          loading: false,
          name:action.payload.name,
          isStudent:action.payload.isStudent
        };



      default:
        return state;
    }
  }
