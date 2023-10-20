import axios from "axios";
import {
  GET_PRODUCTID_FAILED,
  GET_PRODUCTID_LOAD,
  GET_PRODUCTID_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_LOAD,
  GET_PRODUCT_SUCCESS,
  createAction,
} from "../../constants/action-tyoe";

const getProductsRequest = createAction(GET_PRODUCT_LOAD);
const getProductsSuccess = createAction(GET_PRODUCT_SUCCESS);
const getProductsFailure = createAction(GET_PRODUCT_FAILED);
const getProductsRequestID = createAction(GET_PRODUCTID_LOAD);
const getProductsSuccessID = createAction(GET_PRODUCTID_SUCCESS);
const getProductsFailureID = createAction(GET_PRODUCTID_FAILED);

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(getProductsRequest());
    axios
      .get("http://localhost:5000/product")
      .then((response) => {
        const products = response.data.data;
        dispatch(getProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(getProductsFailure(error.message));
      });
  };
};
export const fetchProductsID = () => {
  return (dispatch) => {
    dispatch(getProductsRequestID());
    axios
      .get("http://localhost:5000/product/64fe66dd25562f94b060d4db")
      .then((response) => {
        const productsID = response.data;
        dispatch(getProductsSuccessID(productsID));
      })
      .catch((error) => {
        dispatch(getProductsFailureID(error.message));
      });
  };
};
