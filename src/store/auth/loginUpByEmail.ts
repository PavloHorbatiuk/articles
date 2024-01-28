import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./types";
import { URL } from "api/api";
import { ThunkConfig } from "store/types/stateSchema";
import { USER_LOCAL_STORAGE_KEY } from "common/const/localStorage";
import { authActions } from "./authSlice";

interface LoginByUsernameProps {
    email: string;
    password: string;
}

export const loginUpByEmail = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>("auth/login", async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    const { email, password } = authData;

    try {
        const response = await extra.api.post<User>(URL.LOGIN, {
            email,
            password,
        });

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
        console.error(error);
        return rejectWithValue("Wrong login or password");
    }
});
