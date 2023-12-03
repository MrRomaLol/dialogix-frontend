import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFriends} from "./friendsSlice";
import {getGuilds} from "./guildsSlice";
import {revertAll} from "./index";
import {getData, postData} from "../axios";

const initialState = {
    settings: {},
    isSettingsLoaded: false,
    loading: true,
    error: null,
}

export const fetchAllData = createAsyncThunk(
    'fetch/all',
    async (_, {dispatch}) => {
        const fetchSettings = new Promise(async resolve => {
            const res = await getData('/api/v1/profile/settings');

            if (res.ok) {
                resolve(res.settings);
            }
        })

        const promises = [
            fetchSettings,
            dispatch(getFriends()),
            dispatch(getGuilds()),
        ]

        const results = await Promise.all(promises);
        return results[0];
    }
)

export const updateUserSetting = createAsyncThunk(
    'fetch/updateUserSetting',
    async ({id, settingName, settingValue}, {rejectedWithValue}) => {
        try {
            const data = {
                settingId: id,
                settingName,
                settingValue
            }

            const res = await postData('/api/v1/profile/settings', data);

            return res.setting;

        } catch (err) {
            rejectedWithValue(err.message);
        }
    }
)

const fetchSlice = createSlice({
    name: "fetch",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState)
        builder.addCase(fetchAllData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchAllData.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.settings = payload;
            state.isSettingsLoaded = true;
        })
        builder.addCase(fetchAllData.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        builder.addCase(updateUserSetting.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(updateUserSetting.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.settings[payload.settingName] = {
                id: payload.id,
                settingValue: payload.settingValue,
            }
        })
        builder.addCase(updateUserSetting.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
    }
})

export default fetchSlice.reducer;
