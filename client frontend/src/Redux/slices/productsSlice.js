import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listProduct, listProductDetails } from '../services/productsService';

const initialState = {
    product: {},
    products: [],
    // page: [],
    // pages: [],
    error: false,
    loading: false,
    reviews: {},
}

export const productList = createAsyncThunk(
    'product/list', async (_, thunkAPI) => { // Doesn't send anything to the backend
        const data = await listProduct();
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

export const productDetails = createAsyncThunk(
    'product/details', async (id, thunkAPI) => {
        const data = await listProductDetails(id);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

//productsSlice, action.payload will be the response from backend
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: builder => {
        builder.addCase(productList.pending, (state) => { // If the productList is pending
            state.loading = true;
            state.products = [];
        }).addCase(productList.fulfilled, (state, action) => { // If the productList is fulfilled, updates
            state.loading = false;
            state.error = false;
            // state.pages = action.payload.pages;
            // state.page = action.payload.page;
            state.products = action.payload;
        }).addCase(productList.rejected, (state, action) => { //If the productList is rejected
            state.loading = false;
            state.error = action.payload; //Error message will come from payload
        }).addCase(productDetails.pending, (state) => { // If the productList is pending
            state.loading = true;
            // state.products = [];
        }).addCase(productDetails.fulfilled, (state, action) => { // If the productDetails is fulfilled, updates
            state.loading = false;
            state.error = false;
            // state.pages = action.payload.pages;
            // state.page = action.payload.page;
            state.product = action.payload;
        }).addCase(productDetails.rejected, (state, action) => { //If the productDetails is rejected
            state.loading = false;
            state.error = action.payload; //Error message will come from payload
        })
    }
})

export default productsSlice.reducer;