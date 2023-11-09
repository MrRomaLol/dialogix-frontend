import {createSlice} from "@reduxjs/toolkit";
import {revertAll} from "./index";

export const MAIN_SCREEN = "mainScreen";
export const FRIENDS_SCREEN = "friendsScreen";
export const FRIENDS_SCREEN_FRIENDS_TAB = "friendsList";
export const FRIENDS_SCREEN_PENDING_TAB = "friendsPending";
export const FRIENDS_SCREEN_ADD_FRIENDS_TAB = "friendsAdd";
export const DIRECT_MESSAGES_SCREEN = "directMessagesScreen";
export const SERVER_SCREEN = "serverScreen";

const initialState = {
    screen: MAIN_SCREEN,
    subScreen: "",
}

const screenState = createSlice({
    name: "screenState",
    initialState,
    reducers: {
        setScreen(state, action) {
            state.screen = action.payload.screenName
        },
        setSubScreen(state, action) {
            state.subScreen = action.payload.subScreenName
        },
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState)
    }
})


export const {setScreen, setSubScreen} = screenState.actions;

export default screenState.reducer;


