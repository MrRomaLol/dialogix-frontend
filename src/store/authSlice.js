import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {postData} from "../axios";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";

const initialState = {
    loading: false,
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
            const res = postData('/api/v1/register', user);
            if (!res.ok) {
                return rejectWithValue(res.message);
            }
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
    }
)

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: '/api/v1/'}),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: 'loginstatus',
                method: 'GET',
            })
        })
    }),
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.success = true
            state.userInfo = payload
        },
        [registerUser.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },
        [loginUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.success = true
            state.userInfo = payload
        },
        [loginUser.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },
    }
})

export const {useGetUserDetails} = authApi;

export default authSlice.reducer;