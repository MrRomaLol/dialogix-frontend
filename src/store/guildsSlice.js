import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getData, postData} from "../axios";

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

const guildsSlice = createSlice({
    name: "guilds",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
    }
})

export default guildsSlice.reducer;