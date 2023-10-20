import axios from "axios";
import {
  GET_INVOICEALL_FAILED,
  GET_INVOICEALL_LOAD,
  GET_INVOICEALL_SUCCESS,
  GET_INVOICE_ID_FAILED,
  GET_INVOICE_ID_LOAD,
  GET_INVOICE_ID_SUCCESS,
  createAction,
} from "../../constants/action-tyoe";

const loadgetInvoiceAll = createAction(GET_INVOICEALL_LOAD);
const succesgetInvoiceAll = createAction(GET_INVOICEALL_SUCCESS);
const fieldgetInvoiceAll = createAction(GET_INVOICEALL_FAILED);

const loadgetInvoiceID = createAction(GET_INVOICE_ID_LOAD);
const succesgetInvoiceID = createAction(GET_INVOICE_ID_SUCCESS);
const fieldgetInvoiceID = createAction(GET_INVOICE_ID_FAILED);
export const getInvoiceAll = (Token) => {
  return (dispatch) => {
    dispatch(loadgetInvoiceAll());
    axios
      .get("http://localhost:5000/orders", {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((respon) => {
        dispatch(succesgetInvoiceAll(respon.data.data));
      })
      .catch((error) => {
        dispatch(fieldgetInvoiceAll(error.message));
      });
  };
};

export const getInvoiceByID = (Token, Id) => {
  return (dispatch) => {
    dispatch(loadgetInvoiceID());
    axios
      .get(`http://localhost:5000/invoice/${Id}`, {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      })
      .then((respon) => {
        dispatch(succesgetInvoiceID(respon.data));
      })
      .catch((error) => {
        dispatch(fieldgetInvoiceID(error.message));
      });
  };
};
