import {
  GET_INVOICEALL_FAILED,
  GET_INVOICEALL_LOAD,
  GET_INVOICEALL_SUCCESS,
  GET_INVOICE_ID_FAILED,
  GET_INVOICE_ID_LOAD,
  GET_INVOICE_ID_SUCCESS,
} from "../../constants/action-tyoe";

const initialstate = {
  load: false,
  data: [],
  error: null,
};
export const invoiceRdeucerAll = (state = initialstate, action) => {
  switch (action.type) {
    case GET_INVOICEALL_LOAD:
    case GET_INVOICE_ID_LOAD:
      return {
        ...state,
        load: true,
      };
    case GET_INVOICEALL_SUCCESS:
    case GET_INVOICE_ID_SUCCESS:
      return {
        ...state,
        load: false,
        data: action.payload,
        error: null,
      };
    case GET_INVOICEALL_FAILED:
    case GET_INVOICE_ID_FAILED:
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
