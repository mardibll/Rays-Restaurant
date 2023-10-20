import axios from "axios";
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
  createAction,
} from "../../constants/action-tyoe";
const loadLogin = createAction(LOGIN_LOAD);
const succesLogin = createAction(LOGIN_SUCCESS);
const fieldLogin = createAction(LOGIN_FAILED);
const loadLogout = createAction(SIGNOUT_LOAD);
const succesLogout = createAction(SIGNOUT_SUCCESS);
const fieldLogout = createAction(SIGNOUT_FAILED);
const clearToken = createAction(CLEAR_TOKEN);
const getloadAccont = createAction(GET_ACCOUNT_LOAD);
const getsuccesAccount = createAction(GET_ACCOUNT_SUCCESS);
const geterrorAccount = createAction(GET_ACCOUNT_FAILED);
export const doLogin = (data) => {
  return (dispatch) => {
    dispatch(loadLogin());
    axios
      .post("http://localhost:5000/auth/login", data)
      .then((response) => {
        const token = response.data.token;
        console.log(token, "TOKEN REDUS");
        localStorage.setItem("TOKEN", token);
        dispatch(succesLogin(token));
      })
      .catch((error) => {
        dispatch(fieldLogin(error.message));
      });
  };
};
export const logout = (authToken) => {
  console.log(authToken);
  return (dispatch) => {
    dispatch(loadLogout());
    axios
      .post("http://localhost:5000/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        // dispatch(succesLogout(response.data.message));
        dispatch(clearToken());
        localStorage.removeItem("TOKEN");
      })
      .catch((error) => {
        dispatch(fieldLogout(error.message));
      });
  };
};

export const userAcount = (authToken) => {
  return (dispatch) => {
    dispatch(getloadAccont());
    axios
      .get("http://localhost:5000/auth/me", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        dispatch(getsuccesAccount(response.data));
      })
      .catch((error) => {
        dispatch(geterrorAccount(error.message));
      });
  };
};
