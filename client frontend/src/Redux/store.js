import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import productsReducer from "./slices/productsSlice";
// import productDetails from "./slices/productsSlice";


import {
  productCreateReviewReducer,
  // productDetailsReducer,
  // productListReducer,
} from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
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
  // productList: productListReducer,
  // productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  cart: cartReducer,
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
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];


const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  // preloadedState: initialState,
  devTools: composeWithDevTools(applyMiddleware(...middleware))
});

export default store;
