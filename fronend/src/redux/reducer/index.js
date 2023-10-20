import { combineReducers } from "redux";
import { productReducer, productIDReducer } from "../reducer/productReducer";
import { LoginReducer, getUser } from "./auth-reducer";
import { searchReducer } from "./search";
import { categoryReducer, filterCategory } from "./kategoryReducer";
import { getAllTroli } from "./troliReducer";
import { invoiceRdeucerAll } from "./invoiceReducer";

const rootReducer = combineReducers({
  authtoken: LoginReducer,
  products: productReducer,
  productsID: productIDReducer,
  search: searchReducer,
  categori: categoryReducer,
  filterByCategory: filterCategory,
  troli: getAllTroli,
  user: getUser,
  invoice: invoiceRdeucerAll,
  // Reducer lainnya jika Anda punya lebih dari satu
});

export default rootReducer;
