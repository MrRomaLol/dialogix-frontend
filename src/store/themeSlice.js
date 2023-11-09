import {createSlice} from "@reduxjs/toolkit";
import {revertAll} from "./index";

const initialState = {
    theme: "dark"
}

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: "dark"
    },
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload.themeName
        }
    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState)
    }
})

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;