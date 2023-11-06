import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getData, postData} from "../axios";

const initialState = {
    chats: {},
    currentChatId: null,
    loading: false,
    error: null,
}

export const fetchMessages = createAsyncThunk(
    'chat/fetch',
    async ({chatId}, {rejectWithValue, getState}) => {
        try {
            const offset = getState().chat.chats[chatId]?.messages?.length || 0;

            const res = await getData(`/api/v1/chats?chatId=${chatId}&offset=${offset}`);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return {chatId, messages: res.messages};
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const sendMessage = createAsyncThunk(
    'chat/send',
    async ({tempId, messageText}, {rejectWithValue, getState}) => {
        try {
            const receiverId = getState().chat.currentChatId;

            const data = {
                content: messageText,
                receiverId,
            }

            const res = await postData(`/api/v1/chats/send`, data);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return {tempId, message: res.message};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChat(state, action) {
            state.currentChatId = action.payload.chatId;
        },
        addMessage(state, {payload}) {
            if (!state.chats[payload.message.sender_id]) {
                state.chats[payload.message.sender_id] = {messages: [payload.message]};
            } else {
                state.chats[payload.message.sender_id].messages.push(payload.message);
            }
        },
        setChatTyping(state, {payload}) {
            if (!state.chats[payload.userId]) return;
            state.chats[payload.userId].isUserTyping = payload.isUserTyping;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchMessages.fulfilled, (state, {payload}) => {
            state.loading = false;
            if (!state.chats[payload.chatId]) {
                state.chats[payload.chatId] = {
                    isFetched: payload.messages.length < 20,
                    messages: payload.messages,
                    onceFetched: true
                };
            } else {
                state.chats[payload.chatId].messages.unshift(...payload.messages)
                state.chats[payload.chatId].isFetched = payload.messages.length < 20;
                state.chats[payload.chatId].onceFetched = true;
            }
        })
        builder.addCase(fetchMessages.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(sendMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(sendMessage.fulfilled, (state, {payload}) => {
            state.loading = false;
            const message = payload.message;
            const messages = state.chats[message.receiver_id].messages;

            for (let i = messages.length - 1; i >= 0; i--) {
                if (messages[i].id === payload.tempId) {
                    messages.splice(i, 1);
                    break;
                }
            }

            messages.push(message);
        })
        builder.addCase(sendMessage.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
    }
})

export const {setChat, addMessage, setChatTyping} = chatSlice.actions;

export default chatSlice.reducer;
