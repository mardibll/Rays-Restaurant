import {
  GET_TROLI_FAILED,
  GET_TROLI_LOAD,
  GET_TROLI_SUCCESS,
} from "../../constants/action-tyoe";

const initialgettroli = {
  loading: false,
  product: [],
  qty: localStorage.getItem("QTYITEM") || false,
  error: "",
};
export const getAllTroli = (state = initialgettroli, action) => {
  switch (action.type) {
    case GET_TROLI_LOAD:
      return {
        ...state,
        loading: true,
      };
    case GET_TROLI_SUCCESS:
      return {
        loading: false,
        product: action.payload.items,
        qty: action.payload.count,
        error: "",
      };
    case GET_TROLI_FAILED:
      return {
        loading: false,
        product: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
