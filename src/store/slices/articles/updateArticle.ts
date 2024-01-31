import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "api/api";
import { ThunkConfig } from "store/types/stateSchema";
import { Article } from "../types";
import { ArticleForm } from "components/Feed/ArticleForm/ArticleForm";

interface ArticlesProps extends ArticleForm {
    index?: number;
    id?: number;
}

export const updateArticle = createAsyncThunk<
    Article,
    ArticlesProps,
    ThunkConfig<string>
>("articles/update", async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    const { title, pubDate, link, description } = params;

    try {
        const response = await extra.api.patch<Article>(
            `${URL.UPDATE_ARTICLE}/${params.id}`,
            { title, pubDate, link, description }
        );

        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.response.data.message);
    }
});
