import {createAsyncThunk, createSlice, unwrapResult} from "@reduxjs/toolkit";
import {getFriends} from "./friendsSlice";
import {getGuilds} from "./guildsSlice";
import {revertAll} from "./index";

const initialState = {
    loading: true,
    error: null,
}

export const fetchAllData = createAsyncThunk(
    'fetch/all',
    async (_, {dispatch}) => {
        const promises = [
            dispatch(getFriends()),
            dispatch(getGuilds())
        ]

        const actions = await Promise.all(promises);
        return actions.map(unwrapResult);
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
        })
        builder.addCase(fetchAllData.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
    }
})

export default fetchSlice.reducer;
