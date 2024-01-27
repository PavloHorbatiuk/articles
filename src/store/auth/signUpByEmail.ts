import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { ThunkConfig } from "../types/stateSchema";
import { User } from "./types";
import { authActions } from "./authSlice";
import { URL } from "api/api";
import { USER_LOCAL_STORAGE_KEY } from "common/const/localStorage";

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
        const response = await extra.api.post<User>(URL.LOGIN, authData);

        if (!response.data) {
            throw new Error();
        }
        localStorage.setItem(
            USER_LOCAL_STORAGE_KEY,
            JSON.stringify(response.data)
        );
        dispatch(authActions.setAuthData(response.data));

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch(authActions.setError(error.response?.data.message));
        }
        console.error(error);
        return rejectWithValue("Wrong login or password");
    }
});
