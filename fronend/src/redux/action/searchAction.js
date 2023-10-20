import { SET_SUBMITTED_TERM } from "../../constants/action-tyoe";

export const setSubmittedTerm = (term) => ({
  type: SET_SUBMITTED_TERM,
  payload: term,
});
