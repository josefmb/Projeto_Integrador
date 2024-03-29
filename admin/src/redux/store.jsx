import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { 
  userListReducer, 
  userLoginReducer, 
  userCreateReducer,
  userDeleteReducer, 
  userEditReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/productReducer";

import { 
  warehouseCreateReducer,
  warehouseEditReducer,
  warehouseUpdateReducer,
} from "./reducers/warehouseReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
  userEdit: userEditReducer,
  userUpdate: userUpdateReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  warehouseCreate: warehouseCreateReducer,
  warehouseEdit: warehouseEditReducer,
  warehouseUpdate: warehouseUpdateReducer,
});


const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
