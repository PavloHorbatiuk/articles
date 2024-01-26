import { createSlice } from "@reduxjs/toolkit";
import { FeedSchema } from "./types";

const initialState: FeedSchema = {
    feed: [],
    error: "",
};

export const feedSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // setUpdatName: (state, action: PayloadAction<string>) => {
        //     state.authData && (state.authData.name = action.payload);
        // },
    },
});

export const { actions: feedActions } = feedSlice;
export const { reducer: feedReducer } = feedSlice;
