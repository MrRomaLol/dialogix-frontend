import {createSlice} from "@reduxjs/toolkit";

const screenState = createSlice({
    name: "screenState",
    initialState: {
        screen: "mainScreen"
    },
    reducers: {
        setScreen(state, action) {
            state.screen = action.payload.screenName
        }
    },
})

export const {setScreen} = screenState.actions;

export default screenState.reducer;


