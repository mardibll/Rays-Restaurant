import {
  FILTER_BY_CATEGORY,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_LOAD,
  GET_CATEGORY_SUCCESS,
} from "../../constants/action-tyoe";

const initialState = {
  load: false,
  data: [],
  error: "",
};
export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_LOAD:
      return {
        ...state,
        load: true,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        load: false,
        data: action.payload,
        error: "",
      };
    case GET_CATEGORY_FAILED:
      return {
        ...state,
        load: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
const initialFilter = {
  data: "Kategori",
};
export const filterCategory = (state = initialFilter, action) => {
  switch (action.type) {
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
