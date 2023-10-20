import {
  CLEAR_TOKEN,
  GET_ACCOUNT_FAILED,
  GET_ACCOUNT_LOAD,
  GET_ACCOUNT_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOAD,
  LOGIN_SUCCESS,
  SIGNOUT_FAILED,
  SIGNOUT_LOAD,
  SIGNOUT_SUCCESS,
} from "../../constants/action-tyoe";
const initiallogin = {
  loading: false,
  token: localStorage.getItem("TOKEN"),
  error: null,
};
export const LoginReducer = (state = initiallogin, action) => {
  switch (action.type) {
    case LOGIN_LOAD:
    case SIGNOUT_LOAD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAILED:
    case SIGNOUT_FAILED:
      return {
        ...state,
        loading: false,
        token: null,
        error: action.payload,
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

const initialUser = {
  loading: false,
  data: "",
  error: null,
};
export const getUser = (state = initialUser, action) => {
  switch (action.type) {
    case GET_ACCOUNT_LOAD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ACCOUNT_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
