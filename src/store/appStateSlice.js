import {createSlice} from "@reduxjs/toolkit";

export const APP_LOADING_STATE = 'appLoading';
export const APP_OPENED_STATE = 'appOpened';
export const APP_SETTINGS_STATE = 'appSettings';

const appState = createSlice({
    name: "appState",
    initialState: {
        state: APP_LOADING_STATE,
    },
    reducers: {
        setAppState(state, action) {
            state.state = action.payload.stateName
        }
    },
})



export const {setAppState} = appState.actions;

export default appState.reducer;


