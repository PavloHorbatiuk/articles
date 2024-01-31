import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ArticleSchema } from "../types";
import { getAllArticles } from "./getAllArticle";
import { deleteArticle } from "./deleteArticle";
import { updateArticle } from "./updateArticle";

const initialState: ArticleSchema = {
    feed: { data: [], totalCount: 0 },
    error: "",
    search: "",
    isLoading: false,
};

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        setSearchText: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        deleteArticle: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.feed.data.splice(index, 1);
        },
        updateArticleAction: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            console.log(index, "index");
            // state.feed.data[index] =
        },
    },
    extraReducers: (builder) => {
        // getAllArticles
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
        // deleteArticle
        builder.addCase(deleteArticle.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(deleteArticle.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteArticle.rejected, (state, action) => {
            state.error = action.payload;
        });
        // updateArticle
        builder.addCase(updateArticle.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(updateArticle.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateArticle.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
