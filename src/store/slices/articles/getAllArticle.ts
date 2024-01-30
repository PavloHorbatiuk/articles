import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "api/api";
import { ThunkConfig } from "store/types/stateSchema";
import { FeedData } from "../types";

interface ArticlesProps {
    page: number;
    limit: number;
    token: string | undefined;
}

export const getAllArticles = createAsyncThunk<
    FeedData,
    ArticlesProps,
    ThunkConfig<string>
>("articles/getAll", async (params, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<FeedData>(URL.GET_ALL_ARTICLES, {
            headers: { Authorization: `Bearer ${params.token}` },
            params,
        });

        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.response.data.message);
    }
});
