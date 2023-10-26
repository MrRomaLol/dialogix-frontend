import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getData, postData} from "../axios";

const initialState = {
    friends: [],
    sent: [],
    pending: [],
    loading: false,
    error: null,
}

export const getFriends = createAsyncThunk(
    'friends/get',
    async (_, {rejectWithValue}) => {
        try {
            const res = await getData('/api/v1/friends');

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return res.friends;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const sendFriendRequest = createAsyncThunk(
    'friends/sendRequest',
    async ({nickname}, {rejectWithValue}) => {
        try {
            const data = {
                nickname
            }

            const res = await postData('/api/v1/friends/send', data);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }


        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFriends.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getFriends.fulfilled, (state, {payload}) => {
            if (payload) {
                payload.forEach((el) => {
                    switch (el.friendsStatus) {
                        case 'friends':
                            state.friends.push(el);
                            break;
                        case 'pending':
                            state.pending.push(el);
                            break;
                        case 'sent':
                            state.sent.push(el);
                            break;
                    }
                })
            }
            state.loading = false
        })
        builder.addCase(getFriends.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload
        })
    }
})

export default friendsSlice.reducer;