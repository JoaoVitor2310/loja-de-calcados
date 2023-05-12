import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";


import {
  productCreateReviewReducer,
} from "./Reducers/ProductReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
} from "./Reducers/OrderReducres";

const reducer = combineReducers({
  productReviewCreate: productCreateReviewReducer,
  // cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// login
// const userInfoFromLocalStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// shippingAddress
// const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
//   ? JSON.parse(localStorage.getItem("shippingAddress"))
//   : {};

const middleware = [thunk];


const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  // preloadedState: initialState,
  devTools: composeWithDevTools(applyMiddleware(...middleware))
});

export default store;
