import {createSlice} from "@reduxjs/toolkit";
import {revertAll} from "./index";

export const APP_LOADING_STATE = 'appLoading';
export const APP_OPENED_STATE = 'appOpened';
export const APP_SETTINGS_STATE = 'appSettings';

const initialState = {
    state: APP_LOADING_STATE,
    isConnectedFromAnotherPlace: false,
    isConnectionLost: false,
}

const appState = createSlice({
    name: "appState",
    initialState,
    reducers: {
        setAppState(state, {payload}) {
            state.state = payload.stateName
        },
        setIsConnectedFromAnotherPlace(state, {payload}) {
            state.isConnectedFromAnotherPlace = true;
        },
        setConnectionLost(state, {payload}) {
            state.isConnectionLost = payload.state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState)
    }
})


export const {setAppState, setIsConnectedFromAnotherPlace, setConnectionLost} = appState.actions;

export default appState.reducer;


