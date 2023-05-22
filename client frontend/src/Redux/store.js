import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

import {productCreateReviewReducer,} from "./Reducers/ProductReducers";
import {
  orderListMyReducer,
} from "./Reducers/OrderReducres";

const reducer = combineReducers({
  productReviewCreate: productCreateReviewReducer,
  orderListMy: orderListMyReducer,
});

const middleware = [thunk];

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
  // preloadedState: initialState,
  devTools: composeWithDevTools(applyMiddleware(...middleware))
});

export default store;
