import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getData, postData} from "../axios";
import {socket} from "../socket";
import {revertAll} from "./index";

const initialState = {
    loading: false,
    isAuthenticated: false,
    userInfo: {},
    error: null,
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
        try {
            const user = {
                username,
                password,
            };

            const res = await postData('/api/v1/login', user);

            if (res.status === 'notauser') {
                return rejectWithValue('notauser');
            }

            return res.userInfo;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            const res = await postData('/api/v1/logout');

            if (!res.ok) {
                return rejectWithValue(res.message);
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const checkAuthentication = createAsyncThunk(
    'auth/check',
    async (_, {rejectWithValue}) => {
        try {
            const res = await getData('/api/v1/loginstatus');
            if (!res.ok) {
                return rejectWithValue('notAuthenticated');
            }
            return res.userInfo;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({currentPassword, newPassword}, {rejectWithValue}) => {
        try {
            const data = {
                currentPassword,
                newPassword,
            };

            const res = await postData('/api/v1/changepassword', data);

            console.log(res);

            if (!res.ok) {
                if (res.status === 'unauthorized' || res.status === 'wrong_password') {
                    return rejectWithValue(res.status);
                }
                return rejectWithValue(res.message);
            }

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async ({nickname, avatar}, {rejectWithValue}) => {
        try {
            const data = {
                nickname,
                avatar,
            };

            const res = await postData('/api/v1/profile/update', data);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return {
                nickname: res.profileInfo.nickname,
                avatar_url: res.profileInfo.avatar_url
            }

        } catch (err) {
            return rejectWithValue(err.message);
        }
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
            state.error = null
        })
        builder.addCase(registerUser.fulfilled, (state, {payload}) => {
            state.loading = false
            state.isAuthenticated = true
            state.userInfo = payload
            if (window.IS_USING_DIALOGIX_APP) {
                window.electron.ipcRenderer.sendMessage('saveCookies', ['saveCookies']);
            }
        })
        builder.addCase(registerUser.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload
        })
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.loading = false
            state.isAuthenticated = true
            state.userInfo = payload
            if (window.IS_USING_DIALOGIX_APP) {
                window.electron.ipcRenderer.sendMessage('saveCookies', ['saveCookies']);
            }
        })
        builder.addCase(loginUser.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload
        })
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(logoutUser.fulfilled, (state, {payload}) => {
            state.loading = false
            state.isAuthenticated = false
            state.userInfo = {}
            if (window.IS_USING_DIALOGIX_APP) {
                window.electron.ipcRenderer.sendMessage('saveCookies', ['saveCookies']);
            }
        })
        builder.addCase(logoutUser.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload
        })
        builder.addCase(checkAuthentication.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(checkAuthentication.fulfilled, (state, {payload}) => {
            state.loading = false
            state.isAuthenticated = true
            state.userInfo = payload
        })
        builder.addCase(checkAuthentication.rejected, (state, {payload}) => {
            state.loading = false
            state.isAuthenticated = false
        })
        builder.addCase(changePassword.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(changePassword.fulfilled, (state, {payload}) => {
            state.loading = false
        })
        builder.addCase(changePassword.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload
        })
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(updateProfile.fulfilled, (state, {payload}) => {
            state.loading = false
            state.userInfo = {
                ...state.userInfo,
                nickname: payload.nickname,
                avatar_url: payload.avatar_url
            }
        })
        builder.addCase(updateProfile.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload
        })
    }
})

export default authSlice.reducer;