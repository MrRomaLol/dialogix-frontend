import {createSlice} from "@reduxjs/toolkit";
import {revertAll} from "./index";

const initialState = {

}

const diallerSlice = createSlice({
    name: "dialler",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(revertAll, () => initialState)
    }
})

export const {} = diallerSlice.actions;

export default diallerSlice.reducer;