import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "../types/stateSchema";
import { User } from "./types";
// import { authActions } from "./authSlice";
import { URL } from "api/api";
import { authActions } from "./authSlice";
// import { USER_LOCAL_STORAGE_KEY } from "common/const/localStorage";

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
        dispatch(authActions.setError("User created please do login"));
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return rejectWithValue(error.response.data.message);
    }
});
