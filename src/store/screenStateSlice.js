import {createSlice} from "@reduxjs/toolkit";

export const MAIN_SCREEN = "mainScreen";
export const FRIENDS_SCREEN = "friendsScreen";
export const FRIENDS_SCREEN_FRIENDS_TAB = "friendsList";
export const FRIENDS_SCREEN_PENDING_TAB = "friendsPending";
export const FRIENDS_SCREEN_ADD_FRIENDS_TAB = "friendsAdd";

const screenState = createSlice({
    name: "screenState",
    initialState: {
        screen: MAIN_SCREEN,
        subScreen: "",
    },
    reducers: {
        setScreen(state, action) {
            state.screen = action.payload.screenName
        },
        setSubScreen(state, action) {
            state.subScreen = action.payload.subScreenName
        },
    },
})



export const {setScreen, setSubScreen} = screenState.actions;

export default screenState.reducer;


