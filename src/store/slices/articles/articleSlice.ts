import { createSlice } from "@reduxjs/toolkit";
import { ArticleSchema } from "../types";
import { getAllArticles } from "./getAllArticle";

const initialState: ArticleSchema = {
    feed: { data: [], totalCount: 0 },
    error: "",
    isLoading: false,
};

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        // setArticleData: (state, action: PayloadAction<FeedData>) => {
        //     state.feed = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllArticles.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(getAllArticles.fulfilled, (state, action) => {
            state.feed = action.payload;
        });
        builder.addCase(getAllArticles.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
