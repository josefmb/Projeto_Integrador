import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReviewReducer,
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";

import {
  userDetailsReducer,
  userLoginReducer,
  userVerifyPinReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userDefaultAddressReducer,
} from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  userLogin: userLoginReducer,
  userVerifyingPin: userVerifyPinReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDefaultAddress: userDefaultAddressReducer,
  cart: cartReducer,
});


const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : null;

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: { 
    cartItems: cartItemsFromLocalStorage, 
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
  userDefaultAddress: { defaultAddress: shippingAddressFromLocalStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
