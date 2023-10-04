import {createSlice} from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: "white"
    },
    reducers: {
        changeTheme(state, action) {
            state.theme = action.payload.themeName
        }
    }
})

export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;