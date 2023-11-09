import {createSlice} from "@reduxjs/toolkit";
import {revertAll} from "./index";

export const APP_LOADING_STATE = 'appLoading';
export const APP_OPENED_STATE = 'appOpened';
export const APP_SETTINGS_STATE = 'appSettings';

const initialState = {
    state: APP_LOADING_STATE,
}

const appState = createSlice({
    name: "appState",
    initialState,
    reducers: {
        setAppState(state, action) {
            state.state = action.payload.stateName
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState)
    }
})


export const {setAppState} = appState.actions;

export default appState.reducer;


