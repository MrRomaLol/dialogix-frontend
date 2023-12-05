import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getData, patchData, postData} from "../axios";
import {revertAll} from "./index";
import {addMessage, sendMessage} from "./chatSlice";
import {getRandomName} from "../utils/random";
import {socket} from "../socket";
import {MAIN_SCREEN, setScreen} from "./screenStateSlice";
import {Store} from "react-notifications-component";

const initialState = {
    guilds: [],
    currentGuildId: null,
    loading: false,
    error: null,
}

export const createGuild = createAsyncThunk(
    'guilds/create',
    async ({guildName, avatar}, {rejectWithValue}) => {
        try {
            const data = {
                guildName,
                avatar
            }

            const res = await postData('/api/v1/guilds/create', data);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return res.guild;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const getGuilds = createAsyncThunk(
    'guilds/get',
    async (_, {rejectWithValue}) => {
        try {
            const res = await getData('/api/v1/guilds');

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return res.guilds;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const loadGuild = createAsyncThunk(
    'guilds/load',
    async ({guildId}, {rejectWithValue}) => {
        try {
            const res = await getData(`/api/v1/guilds/info?guildId=${guildId}`);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return {guildId, categories: res.categories, channels: res.channels, users: res.users};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const inviteUsers = createAsyncThunk(
    'guild/invite',
    async ({invitedUsers}, {rejectWithValue, getState, dispatch}) => {
        const state = getState();
        const guildId = state.guilds.currentGuildId;
        const myId = state.auth.userInfo.id;

        try {
            const data = {
                guildId,
                invitedUsers
            }

            const res = await postData('/api/v1/guilds/invite', data);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            res.invitedUsers.forEach((user) => {
                const tempId = getRandomName(6);
                const messageText = `${window.location.origin}/invite?id=${res.link}`
                const message = {
                    id: tempId,
                    sender_id: myId,
                    receiver_id: user,
                    content: messageText,
                    status: 'sending',
                }
                dispatch(addMessage({message, chatId: user}));
                dispatch(sendMessage({tempId, messageText, receiverId: user}));
            })


        } catch (err) {
            rejectWithValue(err.message);
        }
    }
)

export const acceptGuildInvite = createAsyncThunk(
    'guild/acceptInvite',
    async ({linkId}, {rejectWithValue}) => {
        try {
            const res = await postData(`/api/v1/guilds/acceptinvite?id=${linkId}`);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return res.guild;

        } catch (err) {
            rejectWithValue(err.message);
        }
    }
)

export const createCategory = createAsyncThunk(
    'guild/createCategory',
    async ({categoryName}, {rejectWithValue, getState}) => {
        const guildState = getState().guilds;
        const guildId = guildState.currentGuildId;

        try {
            const data = {
                guildId,
                categoryName
            };

            const res = await postData('/api/v1/guilds/createcategory', data);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return {guildId, category: res.category};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'guild/deleteCategory',
    async ({categoryId}, {rejectWithValue, getState}) => {
        const guildState = getState().guilds;
        const guildId = guildState.currentGuildId;

        try {
            const data = {
                guildId,
                categoryId
            };

            const res = await patchData('/api/v1/guilds/deletecategory', data);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return {guildId, categoryId};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const createChannel = createAsyncThunk(
    'guild/createChannel',
    async ({channelName, channelType, categoryId}, {rejectWithValue, getState}) => {
        const guildState = getState().guilds;
        const guildId = guildState.currentGuildId;

        try {
            const data = {
                guildId,
                categoryId,
                channelName,
                channelType,
            };

            const res = await postData('/api/v1/guilds/createchannel', data);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return {guildId, channel: res.channel};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const deleteChannel = createAsyncThunk(
    'guild/deleteChannel',
    async ({channelId}, {rejectWithValue, getState}) => {
        const guildState = getState().guilds;
        const guildId = guildState.currentGuildId;

        try {
            const data = {
                guildId,
                channelId
            };

            const res = await patchData('/api/v1/guilds/deletechannel', data);

            if (!res.ok) {
                return rejectWithValue(res.message);
            }

            return {guildId, channelId};

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const kickGuildUser = createAsyncThunk(
    'guild/kick',
    async ({memberInGuildId, userId}, {rejectWithValue, getState}) => {
        const guildState = getState().guilds;
        const guildId = guildState.currentGuildId;

        try {
            const data = {
                memberInGuildId,
                guildId,
                userId
            }

            const res = await patchData('/api/v1/guilds/kick', data);

            if (!res.ok) {
                return rejectWithValue(res.message)
            }

            return {memberInGuildId: res.memberInGuildId, guildId: res.guildId};

        } catch (err) {
            rejectWithValue(err.message);
        }
    }
)

export const removeGuild = createAsyncThunk(
    'guild/remove',
    async ({guildId}, {dispatch, getState}) => {
        const state = getState();
        const currentGuildId = state.guilds.currentGuildId;

        let isActiveGuildKicked = false;

        if (currentGuildId === guildId) {
            await dispatch(setScreen({screenName: MAIN_SCREEN}));
            await dispatch(setCurrentGuild({currentGuildId: null}));
            isActiveGuildKicked = true;
        }

        return {guildId, isActiveGuildKicked}
    }
)

const guildsSlice = createSlice({
    name: "guilds",
    initialState,
    reducers: {
        setCurrentGuild(state, {payload}) {
            state.currentGuildId = payload.currentGuildId;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState)
        builder.addCase(createGuild.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createGuild.fulfilled, (state, {payload}) => {
            state.guilds.push(payload);
            state.loading = false;
        })
        builder.addCase(createGuild.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(getGuilds.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getGuilds.fulfilled, (state, {payload}) => {
            state.guilds.length = 0;
            state.guilds.push(...payload);
            state.loading = false;
        })
        builder.addCase(getGuilds.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(loadGuild.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(loadGuild.fulfilled, (state, {payload}) => {
            const guild = state.guilds.find(guild => guild.id === payload.guildId);

            guild.users = payload.users;

            const guildChannels = [];

            payload.categories.forEach((category) => {
                category = {...category, objectType: "category", channels: []}
                guildChannels.push(category);
            })

            payload.channels.forEach((channel) => {
                channel = {...channel, objectType: "channel"};
                const categoryId = channel.category_id;
                if (!categoryId) {
                    return guildChannels.push(channel);
                }

                const category = guildChannels.find((category) => category.id === channel.category_id && category.objectType === "category");

                if (!category) {
                    return guildChannels.push(channel); //wtf is this even possible??? but anyway
                }

                category.channels.push(channel);

            })

            guild.channels = guildChannels;

            guild.isLoaded = true;
            state.loading = false;
        })
        builder.addCase(loadGuild.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(inviteUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(inviteUsers.fulfilled, (state, {payload}) => {
            state.loading = false;
        })
        builder.addCase(inviteUsers.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(acceptGuildInvite.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(acceptGuildInvite.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.guilds.push(payload);
            socket.emit('join', `g-${payload.id}`);
        })
        builder.addCase(acceptGuildInvite.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createCategory.fulfilled, (state, {payload}) => {
            state.loading = false;
            const guild = state.guilds.find(guild => guild.id === payload.guildId);
            guild.channels.push({...payload.category, objectType: "category", channels: []});
        })
        builder.addCase(createCategory.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteCategory.fulfilled, (state, {payload}) => {
            state.loading = false;
            const guild = state.guilds.find(guild => guild.id === payload.guildId);
            guild.channels = guild.channels.filter(item => !(item.id === payload.categoryId && item.objectType === "category"));
        })
        builder.addCase(deleteCategory.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(createChannel.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createChannel.fulfilled, (state, {payload}) => {
            state.loading = false;
            const guild = state.guilds.find(guild => guild.id === payload.guildId);

            if (!payload.channel.category_id) {
                guild.channels.push({...payload.channel, objectType: "channel"})
                return;
            }

            const category = guild.channels.find(category => category.id === payload.channel.category_id && category.objectType === "category");
            if (!category) {
                guild.channels.push({...payload.channel, objectType: "channel"})
                return;
            }
            category.channels.push({...payload.channel, objectType: "channel"})
        })
        builder.addCase(createChannel.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(deleteChannel.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteChannel.fulfilled, (state, {payload}) => {
            state.loading = false;
            const guild = state.guilds.find(guild => guild.id === payload.guildId);

            guild.channels.forEach(obj => {
                if (obj.objectType === "channel") {
                    if (obj.id === payload.channelId) {
                        guild.channels = guild.channels.filter(channel => !(channel.id === payload.channelId && channel.objectType === 'channel'));
                    }
                } else if (obj.objectType === "category") {
                    obj.channels = obj.channels.filter(channel => channel.id !== payload.channelId);
                }
            });
        })
        builder.addCase(deleteChannel.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(kickGuildUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(kickGuildUser.fulfilled, (state, {payload}) => {
            state.loading = false;
            const guild = state.guilds.find(guild => guild.id === payload.guildId);
            guild.users = guild.users.filter((user) => user.guild_user_id !== payload.memberInGuildId);
        })
        builder.addCase(kickGuildUser.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(removeGuild.fulfilled, (state, {payload}) => {
            state.guilds = state.guilds.filter((guild) => guild.id !== payload.guildId);
        })
    }
})

export const {setCurrentGuild} = guildsSlice.actions;

export default guildsSlice.reducer;
