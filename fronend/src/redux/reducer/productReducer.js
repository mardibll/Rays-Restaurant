import {
  GET_PRODUCTID_FAILED,
  GET_PRODUCTID_LOAD,
  GET_PRODUCTID_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_LOAD,
  GET_PRODUCT_SUCCESS,
} from "../../constants/action-tyoe";

const initialProduct = {
  loading: false,
  product: [],
  error: "",
};

export const productReducer = (state = initialProduct, action) => {
  // console.log(action, "FO");
  switch (action.type) {
    case GET_PRODUCT_LOAD:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        error: "",
      };
    case GET_PRODUCT_FAILED:
      return {
        loading: false,
        product: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
// const initialProducID = {
//   loading: false,
//   product: [],
//   error: "",
// };
export const productIDReducer = (state = initialProduct, action) => {
  switch (action.type) {
    case GET_PRODUCTID_LOAD:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTID_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        error: "",
      };
    case GET_PRODUCTID_FAILED:
      return {
        loading: false,
        product: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
