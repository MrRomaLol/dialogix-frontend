import {createSlice} from "@reduxjs/toolkit";

const screenState = createSlice({
    name: "screenState",
    initialState: {
        screen: "mainScreen",
        subScreen: "",
    },
    reducers: {
        setScreen(state, action) {
            state.screen = action.payload.screenName
        },
        setSubScreen(state, action) {
            state.screen = action.payload.subScreenName
        },
    },
})

export const {setScreen, setSubScreen} = screenState.actions;

export default screenState.reducer;


