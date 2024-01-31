import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "api/api";
import { ThunkConfig } from "store/types/stateSchema";
import { Article } from "../types";
import { articleActions } from "./articleSlice";

interface ArticlesProps {
    id: number;
    index: number;
}

export const deleteArticle = createAsyncThunk<
    Article,
    ArticlesProps,
    ThunkConfig<string>
>("articles/delete", async (params, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.delete<Article>(
            `${URL.DELETE_ARTICLE}/${params.id}`
        );
        dispatch(articleActions.deleteArticle(params.index));
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.response.data.message);
    }
});
