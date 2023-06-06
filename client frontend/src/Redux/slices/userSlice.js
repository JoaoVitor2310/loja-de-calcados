import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser, updateUser } from '../services/userService';

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfoLocal")
    ? JSON.parse(localStorage.getItem("userInfoLocal"))
    : null;

const initialState = {
    userInfo: userInfoFromLocalStorage,
    error: false,
    loading: false,
    success: false, // Só será usado no userUpdate
}

export const userRegister = createAsyncThunk(
    'user/register', async (registerInfo, thunkAPI) => {
        const data = await registerUser(registerInfo);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

export const userLogin = createAsyncThunk(
    'user/login', async (loginInfo, thunkAPI) => {
        const data = await loginUser(loginInfo);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)

export const userLogout = createAsyncThunk(
    'user/logout', async (_, thunkAPI) => {
        const data = await logoutUser();
        return data;
    }
)

export const userUpdate = createAsyncThunk(
    'user/update', async (newProfile, thunkAPI) => {
        const data = await updateUser(newProfile);
        if (data.message) {
            return thunkAPI.rejectWithValue(data.message);
        }
        return data;
    }
)


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(userRegister.pending, (state) => { // If the userRegister is pending
            state.loading = true;
        }).addCase(userRegister.fulfilled, (state, action) => { // If the userRegister is fulfilled, updates
            state.loading = false;
            state.error = false;
            state.userInfo = action.payload;
            localStorage.setItem("userInfoLocal", JSON.stringify(state.userInfo));
        }).addCase(userRegister.rejected, (state, action) => { //If the userRegister is rejected
            state.loading = false;
            state.error = action.payload; //Error message will come from payload
        }).addCase(userLogin.pending, (state) => { // If the userLogin is pending
            state.loading = true;
        }).addCase(userLogin.fulfilled, (state, action) => { // If the userLogin is fulfilled, updates
            state.loading = false;
            state.error = false;
            state.userInfo = action.payload;
            localStorage.setItem("userInfoLocal", JSON.stringify(state.userInfo));
        }).addCase(userLogin.rejected, (state, action) => { //If the userLogin is rejected
            state.loading = false;
            state.error = action.payload; //Error message will come from payload
        }).addCase(userLogout.pending, (state) => { // If the userLogout is pending
            state.loading = true;
        }).addCase(userLogout.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.userInfo = null;
        }).addCase(userUpdate.pending, (state) => {
            state.loading = true;
        }).addCase(userUpdate.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.userInfo = action.payload;
            state.success = true;

            localStorage.setItem("userInfoLocal", JSON.stringify(state.userInfo));
        }).addCase(userUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
    }
})

export default usersSlice.reducer;