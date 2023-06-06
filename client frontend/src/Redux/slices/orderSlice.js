import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { creatingOrder, detailsFromOrder, payingOrder } from '../services/orderService';

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
    order: {},
    paymentMethod: paymentMethodFromLocalStorage,
    loading: true,
    error: false,
    success: false,
}

export const createOrder = createAsyncThunk(
    'order/create', async (orderInfo, thunkAPI) => {
        const data = await creatingOrder(orderInfo);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

export const orderDetails = createAsyncThunk(
    'order/details', async (tokenId, thunkAPI) => {
        const data = await detailsFromOrder(tokenId);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

export const orderPay = createAsyncThunk(
    'order/pay', async (orderInfo, thunkAPI) => {
        const data = await payingOrder(orderInfo);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

export const cartSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: builder => {
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
        }).addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.order = action.payload;
            state.success = true;
            localStorage.removeItem("cartItems");
        }).addCase(createOrder.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        
        .addCase(orderDetails.pending, (state) => {
            state.loading = true;
        }).addCase(orderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.order = action.payload;
            state.success = true;
        }).addCase(orderDetails.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        
        .addCase(orderPay.pending, (state) => {
            state.loading = true;
        }).addCase(orderPay.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
        }).addCase(orderPay.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
    }
})

export default cartSlice.reducer;