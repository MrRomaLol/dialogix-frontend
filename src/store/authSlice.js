import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getData, postData} from "../axios";
import {socket} from "../socket";
import {revertAll} from "./index";

const initialState = {
    loading: false,
    isAuthenticated: false,
    userInfo: {},
    error: null,
    success: null,
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({username, email, password}, {rejectWithValue}) => {
        try {
            const user = {
                username,
                email,
                password
            }
            const res = await postData('/api/v1/register', user);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return res.userInfo;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({username, password}, {rejectWithValue}) => {
        const user = {
            username,
            password,
        };

        const res = await postData('/api/v1/login', user);

        if (res.status === 'notauser') {
            return rejectWithValue('notauser');
        }

        return res.userInfo;
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        const res = await postData('/api/v1/logout');

        if (!res.ok) {
            return rejectWithValue(res.message);
        }
    }
)

export const checkAuthentication = createAsyncThunk(
    'auth/check',
    async (_, {rejectWithValue}) => {
        const res = await getData('/api/v1/loginstatus');
        if (!res.ok) {
            return rejectWithValue('notAuthenticated');
        }
        return res.userInfo;
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState)
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.success = null
            state.error = null
        })
        builder.addCase(registerUser.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            state.isAuthenticated = true
            state.userInfo = payload
            if (window.IS_USING_DIALOGIX_APP) {
                window.electron.ipcRenderer.sendMessage('saveCookies', ['saveCookies']);
            }
        })
        builder.addCase(registerUser.rejected, (state, {payload}) => {
            state.loading = false
            state.success = false
            state.error = payload
        })
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.success = null
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            state.isAuthenticated = true
            state.userInfo = payload
            if (window.IS_USING_DIALOGIX_APP) {
                window.electron.ipcRenderer.sendMessage('saveCookies', ['saveCookies']);
            }
        })
        builder.addCase(loginUser.rejected, (state, {payload}) => {
            state.loading = false
            state.success = false
            state.error = payload
        })
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true
            state.success = null
            state.error = null
        })
        builder.addCase(logoutUser.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            state.isAuthenticated = false
            state.userInfo = {}
            if (window.IS_USING_DIALOGIX_APP) {
                window.electron.ipcRenderer.sendMessage('saveCookies', ['saveCookies']);
            }
        })
        builder.addCase(logoutUser.rejected, (state, {payload}) => {
            state.loading = false
            state.success = false
            state.error = payload
        })
        builder.addCase(checkAuthentication.pending, (state) => {
            state.loading = true
            state.success = null
            state.error = null
        })
        builder.addCase(checkAuthentication.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            state.isAuthenticated = true
            state.userInfo = payload
        })
        builder.addCase(checkAuthentication.rejected, (state, {payload}) => {
            state.loading = false
            state.success = false
            state.isAuthenticated = false
        })
    }
})

export default authSlice.reducer;