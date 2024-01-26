import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthSchema, User } from "./types";
import { signUpByEmail } from "./signUpByEmail";

const initialState: AuthSchema = {
    authData: { name: "", email: "", token: "" },
    isLoading: false,
    error: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUpByEmail.fulfilled, (state) => {
                state.isLoading = true;
                state.error = "pls, do login";
            })
            .addCase(signUpByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
