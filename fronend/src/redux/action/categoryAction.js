import axios from "axios";
import {
  FILTER_BY_CATEGORY,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_LOAD,
  GET_CATEGORY_SUCCESS,
  createAction,
} from "../../constants/action-tyoe";
const categoryload = createAction(GET_CATEGORY_LOAD);
const categorySucces = createAction(GET_CATEGORY_SUCCESS);
const categoryError = createAction(GET_CATEGORY_FAILED);

const filterCategory = createAction(FILTER_BY_CATEGORY);
export const fetchKategori = () => {
  return (dispatch) => {
    dispatch(categoryload);
    axios
      .get("http://localhost:5000/categories")
      .then((respon) => {
        dispatch(categorySucces(respon.data));
      })
      .catch((error) => {
        dispatch(categoryError(error.message));
      });
  };
};
export const categoryFilter = (filter) => {
  console.log(filter, "FILTER");
  return (dispatch) => {
    dispatch(filterCategory(filter));
  };
};
