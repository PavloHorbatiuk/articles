import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "api/api";
import { ThunkConfig } from "store/types/stateSchema";
import { Article } from "../types";
import { ArticleForm } from "components/Feed/ArticleForm/ArticleForm";

interface ArticlesProps extends ArticleForm {}

export const createArticle = createAsyncThunk<
    Article,
    ArticlesProps,
    ThunkConfig<string>
>("articles/create", async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<Article>(
            URL.CREATE_ARTICLE,
            params
        );

        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.response.data.message);
    }
});
