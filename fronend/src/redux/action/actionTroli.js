import axios from "axios";
import {
  ADD_TROLI_SUCCESS,
  DELETE_TROLI_SUCCESS,
  GET_TROLI_FAILED,
  GET_TROLI_LOAD,
  GET_TROLI_SUCCESS,
  UPDATE_TROLI_SUCCES,
  createAction,
} from "../../constants/action-tyoe";

const getTroliRequest = createAction(GET_TROLI_LOAD);
const getTroliSucces = createAction(GET_TROLI_SUCCESS);
const getTroliError = createAction(GET_TROLI_FAILED);
const addSucces = createAction(ADD_TROLI_SUCCESS);
const updateSucces = createAction(UPDATE_TROLI_SUCCES);
const removeSucces = createAction(DELETE_TROLI_SUCCESS);
export const troliAll = (Token) => {
  return (dispatch) => {
    dispatch(getTroliRequest());
    axios
      .get("http://localhost:5000/carts", {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((respon) => {
        console.log(respon.data);
        const qtyItem = respon.data.count;
        localStorage.setItem("QTYITEM", qtyItem);
        dispatch(getTroliSucces(respon.data));
      })
      .catch((error) => dispatch(getTroliError(error)));
  };
};
export const addTroli = (Token, data) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/carts", data, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((respon) => {
        dispatch(troliAll(Token));
        dispatch(addSucces(respon));
      });
  };
};
export const updateTroli = (Token, data) => {
  return (dispatch) => {
    axios
      .put("http://localhost:5000/carts", data, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((respon) => {
        dispatch(troliAll(Token));
        dispatch(updateSucces(respon));
      });
  };
};
export const removeTroli = (Token, ID) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:5000/carts/${ID}`, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((respon) => {
        dispatch(troliAll(Token));
        dispatch(removeSucces(respon));
      });
  };
};
