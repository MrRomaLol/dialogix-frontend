import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getData, patchData, postData} from "../axios";
import {revertAll} from "./index";

const initialState = {
    friends: [],
    sent: [],
    pending: [],
    loading: false,
    error: null,
    status: null,
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
                return rejectWithValue({error: res.error, status: res.status});
            }

            return res.friend;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const unSendFriendRequest = createAsyncThunk(
    'friends/unSendRequest',
    async ({id}, {rejectWithValue}) => {
        try {
            const data = {
                userId: id
            }

            const res = await patchData('/api/v1/friends/send', data);

            if (!res.ok) {
                return rejectWithValue({error: res.error, status: res.status});
            }

            return {userId: res.userId};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const acceptFriendRequest = createAsyncThunk(
    'friends/acceptRequest',
    async ({id}, {rejectWithValue}) => {
        try {
            const data = {
                userId: id
            }

            const res = await postData('/api/v1/friends/accept', data);

            if (!res.ok) {
                return rejectWithValue({error: res.error, status: res.status});
            }

            return {userId: res.userId};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const rejectFriendRequest = createAsyncThunk(
    'friends/rejectRequest',
    async ({id}, {rejectWithValue}) => {
        try {
            const data = {
                userId: id
            }

            const res = await postData('/api/v1/friends/reject', data);

            if (!res.ok) {
                return rejectWithValue({error: res.error, status: res.status});
            }

            return {userId: res.userId};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const deleteFriend = createAsyncThunk(
    'friends/delete',
    async ({id}, {rejectWithValue}) => {
        try {
            const data = {
                userId: id
            }

            const res = await postData('/api/v1/friends/delete', data);

            if (!res.ok) {
                return rejectWithValue({error: res.error, status: res.status});
            }

            return {userId: res.userId};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        setNotification(state, {payload}) {
            const friendIndex = state.friends.findIndex(friend => friend.id === payload.id);
            const friend = state.friends[friendIndex]
            friend.hasNotification = payload.state;
            if (payload.state === true) {
                state.friends.splice(friendIndex, 1);
                state.friends.unshift(friend);
            }
        },
        updateFriendProfile(state, {payload}) {
            const friendIndex = state.friends.findIndex(friend => friend.id === payload.id);
            if (friendIndex >= 0) {
                const friend = state.friends[friendIndex];
                friend.nickname = payload.profileInfo.nickname;
                friend.avatar_url = payload.profileInfo.avatar_url;
                return;
            }
            const sentIndex = state.sent.findIndex(friend => friend.id === payload.id);
            if (sentIndex >= 0) {
                const friend = state.sent[sentIndex];
                friend.nickname = payload.profileInfo.nickname;
                friend.avatar_url = payload.profileInfo.avatar_url;
                return;
            }
            const pendingIndex = state.pending.findIndex(friend => friend.id === payload.id);
            if (pendingIndex >= 0) {
                const friend = state.pending[pendingIndex];
                friend.nickname = payload.profileInfo.nickname;
                friend.avatar_url = payload.profileInfo.avatar_url;
            }
        },
        updateFriendStatus(state, {payload}) {
            const friendIndex = state.friends.findIndex(friend => friend.id === payload.id);
            if (friendIndex >= 0) {
                const friend = state.friends[friendIndex];
                friend.status = payload.status;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState)
        builder.addCase(getFriends.pending, (state) => {
            state.loading = true
            state.error = null
            state.status = null
        })
        builder.addCase(getFriends.fulfilled, (state, {payload}) => {
            if (payload) {
                state.friends = [];
                state.pending = [];
                state.sent = [];
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
        builder.addCase(sendFriendRequest.pending, (state) => {
            state.loading = true
            state.error = null
            state.status = null
        })
        builder.addCase(sendFriendRequest.fulfilled, (state, {payload}) => {
            state.loading = false
            state.status = 'requested'
            state.sent.push(payload);
        })
        builder.addCase(sendFriendRequest.rejected, (state, {payload}) => {
            state.loading = false
            state.status = payload.status
            state.error = payload.error
        })
        builder.addCase(unSendFriendRequest.pending, (state) => {
            state.loading = true
            state.error = null
            state.status = null
        })
        builder.addCase(unSendFriendRequest.fulfilled, (state, {payload}) => {
            state.loading = false
            state.sent = state.sent.filter(friend => friend.id !== payload.userId)
        })
        builder.addCase(unSendFriendRequest.rejected, (state, {payload}) => {
            state.loading = false
            state.status = payload.status
            state.error = payload.error
        })
        builder.addCase(acceptFriendRequest.pending, (state) => {
            state.loading = true
            state.error = null
            state.status = null
        })
        builder.addCase(acceptFriendRequest.fulfilled, (state, {payload}) => {
            state.loading = false
            const transferredFriend = state.pending.find(friend => friend.id === payload.userId)
            state.friends.push(transferredFriend)
            state.pending = state.pending.filter(friend => friend.id !== payload.userId)
        })
        builder.addCase(acceptFriendRequest.rejected, (state, {payload}) => {
            state.loading = false
            state.status = payload.status
            state.error = payload.error
        })
        builder.addCase(rejectFriendRequest.pending, (state) => {
            state.loading = true
            state.error = null
            state.status = null
        })
        builder.addCase(rejectFriendRequest.fulfilled, (state, {payload}) => {
            state.loading = false
            state.pending = state.pending.filter(friend => friend.id !== payload.userId)
        })
        builder.addCase(rejectFriendRequest.rejected, (state, {payload}) => {
            state.loading = false
            state.status = payload.status
            state.error = payload.error
        })
        builder.addCase(deleteFriend.pending, (state) => {
            state.loading = true
            state.error = null
            state.status = null
        })
        builder.addCase(deleteFriend.fulfilled, (state, {payload}) => {
            state.loading = false
            state.friends = state.friends.filter(friend => friend.id !== payload.userId)
        })
        builder.addCase(deleteFriend.rejected, (state, {payload}) => {
            state.loading = false
            state.status = payload.status
            state.error = payload.error
        })
    }
})

export const {setNotification, updateFriendProfile, updateFriendStatus} = friendsSlice.actions;

export default friendsSlice.reducer;