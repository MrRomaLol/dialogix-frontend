import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getData, postData} from "../axios";
import {revertAll} from "./index";

const initialState = {
    guilds: [],
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
    async (_, rejectWithValue) => {
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

const guildsSlice = createSlice({
    name: "guilds",
    initialState,
    reducers: {},
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
    }
})

export default guildsSlice.reducer;
