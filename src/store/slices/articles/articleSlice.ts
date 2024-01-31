import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Article, ArticleSchema } from "../types";
import { getAllArticles } from "./getAllArticle";
import { deleteArticle } from "./deleteArticle";
import { updateArticle } from "./updateArticle";
import { createArticle } from "./createArticle";

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
        setArticles: (state, action: PayloadAction<Article[]>) => {
            state.feed.data = action.payload;
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
        // createArticle
        builder.addCase(createArticle.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(createArticle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.feed.data.unshift(action.payload);
        });
        builder.addCase(createArticle.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
