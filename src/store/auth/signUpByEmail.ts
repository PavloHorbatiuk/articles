import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "../types/stateSchema";
import { User } from "./types";
import { authActions } from "./authSlice";
import { URL } from "api/api";
import { USER_LOCAL_STORAGE_KEY } from "common/const/localStorage";
import axios from "axios";

interface SignUpProps {
    name?: string;
    email: string;
    password: string;
}

export const signUpByEmail = createAsyncThunk<
    User,
    SignUpProps,
    ThunkConfig<string>
>("auth/signup", async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<User>(URL.REGISTRATION, authData);

        localStorage.setItem(
            USER_LOCAL_STORAGE_KEY,
            JSON.stringify(response.data)
        );
        dispatch(authActions.setAuthData(response.data));

        return response.data;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            dispatch(authActions.setError(error.response?.data.message));
        }
        console.error(error);

        return rejectWithValue(error.response.data.message as string);
    }
});
