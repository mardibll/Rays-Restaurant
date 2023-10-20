import {
  SET_SEARCH_RESULTS,
  SET_SEARCH_TERM,
  SET_SUBMITTED_TERM,
} from "../../constants/action-tyoe";

const initialState = {
  searchTerm: "",
  searchResults: [],
  submittedTerm: "",
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
      case SET_SUBMITTED_TERM:
        return {
          ...state,
          submittedTerm: action.payload,
        };
    default:
      return state;
  }
};
