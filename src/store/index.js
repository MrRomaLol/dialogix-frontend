import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import screenStateReducer from "./screenStateSlice";

export default configureStore({
    reducer: {
        theme: themeReducer,
        screenState: screenStateReducer,
    }
})
