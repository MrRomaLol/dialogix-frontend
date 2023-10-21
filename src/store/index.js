import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import screenStateReducer from "./screenStateSlice";
import appStateReducer from "./appStateSlice";

export default configureStore({
    reducer: {
        theme: themeReducer,
        appState: appStateReducer,
        screenState: screenStateReducer,
    }
})
