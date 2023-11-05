import {configureStore} from "@reduxjs/toolkit";

import fetchReducer from "./fetchSlice";
import themeReducer from "./themeSlice";
import screenStateReducer from "./screenStateSlice";
import appStateReducer from "./appStateSlice";
import authReducer from "./authSlice";
import friendsReducer from './friendsSlice'
import guildsReducer from './guildsSlice'
import chatReducer from './chatSlice'

export default configureStore({
    reducer: {
        fetchRoot: fetchReducer,
        auth: authReducer,
        appState: appStateReducer,
        screenState: screenStateReducer,
        friends: friendsReducer,
        guilds: guildsReducer,
        chat: chatReducer,
        theme: themeReducer,
    },
})
