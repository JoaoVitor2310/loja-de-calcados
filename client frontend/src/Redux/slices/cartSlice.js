import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, removeFromCart, savingShippingAddress, savingPayment } from '../services/cartService';

// import { initialState } from '../store';

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

  const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
    item: {},
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage,
    itemsPrice: 99999, // Valores iniciais, só para garantir que ninguém irá comprar caso ocorra um bug.
    shippingPrice: 99999,
    taxPrice: 99999,
    loading: false,
    error: false,
}
// userLogin: { userInfo: userInfoFromLocalStorage },

export const cartAddItem = createAsyncThunk(
    'cart/add', async (itemInfo, thunkAPI) => {
        const data = await addToCart(itemInfo);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

export const cartRemoveItem = createAsyncThunk(
    'cart/remove', async (id) => {
        const data = removeFromCart(id);
        return data;
    }
)

export const saveShippingAddress = createAsyncThunk(
    'cart/saveShipping', async (fullAddress, thunkAPI) => {
        const data = savingShippingAddress(fullAddress);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

export const savePayment = createAsyncThunk(
    'cart/savePayment', async (method, thunkAPI) => {
        const data = savingPayment(method);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

// export const savePrices = createAsyncThunk(
//     'cart/savePrices', async (princesInfo, thunkAPI) => {
//         const data = savingPayment(princesInfo);
//         if (data.message) {
//             return thunkAPI.rejectWithValue(data.message);
//         }
//         return data;
//     }
// )


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: builder => {
        builder.addCase(cartAddItem.pending, (state) => { // If the cartAddItem is pending
            state.loading = true;
        }).addCase(cartAddItem.fulfilled, (state, action) => { // If the cartAddItem is fulfilled, updates
            state.loading = false;
            state.error = false;
            state.item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === state.item.product); // The item or undefined
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.product === existItem.product ? x = state.item : x
                )
            } else {
                state.cartItems = [...state.cartItems, state.item];
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }).addCase(cartAddItem.rejected, (state, action) => { //If the cartAddItem is rejected
            state.loading = false;
            state.error = action.payload; //Error message will come from payload
        }).addCase(cartRemoveItem.pending, (state) => {
            state.loading = true;
        }).addCase(cartRemoveItem.fulfilled, (state, action) => { 
            state.loading = false;
            state.error = false;
            state.item = action.payload;
            state.cartItems = [...state.cartItems];
            state.cartItems = state.cartItems.filter((x) => x.product !== state.item);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }).addCase(cartRemoveItem.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        }).addCase(saveShippingAddress.pending, (state) => {
            state.loading = true;
        }).addCase(saveShippingAddress.fulfilled, (state, action) => { 
            state.loading = false;
            state.error = false;
            state.shippingAddress = action.payload;
            localStorage.setItem("shippingAddress", JSON.stringify(state.shippingAddress));
        }).addCase(saveShippingAddress.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        }).addCase(savePayment.pending, (state) => {
            state.loading = true;
        }).addCase(savePayment.fulfilled, (state, action) => { 
            state.loading = false;
            state.error = false;
            state.paymentMethod = action.payload;
            
            localStorage.setItem("paymentMethod", JSON.stringify(state.paymentMethod));
        }).addCase(savePayment.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        })
        // .addCase(savePrices.pending, (state) => {
        //     state.loading = true;
        // }).addCase(savePrices.fulfilled, (state, action) => { 
        //     state = [...state];
        //     state.loading = false;
        //     state.error = false;
        //     console.log(action.payload)
            
        //     // state.itemsPrice = action.payload.itemsPrice;
        //     // state.shippingPrice = action.payload.shippingPrice;
        //     // state.taxPrice = action.payload.taxPrice;
        //     // state.totalPrice = action.payload.totalPrice;
        //     localStorage.setItem("paymentMethod", JSON.stringify(state.paymentMethod));
        // }).addCase(savePrices.rejected, (state, action) => { 
        //     state.loading = false;
        //     state.error = action.payload;
        // })
    }
})

export default cartSlice.reducer;