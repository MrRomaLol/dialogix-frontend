import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import screenStateReducer from "./screenStateSlice";
import appStateReducer from "./appStateSlice";
import authReducer from "./authSlice";
import friendsReducer from './friendsSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        appState: appStateReducer,
        screenState: screenStateReducer,
        friends: friendsReducer,
        theme: themeReducer,
    }
})
