import {
    type ReducersMapObject,
    configureStore,
    type ThunkDispatch,
    type Reducer,
    AnyAction,
} from "@reduxjs/toolkit";
import { $api } from "../api/api";
import { type NavigateOptions, type To } from "react-router-dom";

import { feedReducer } from "./slices/feedSlice";
import { createReducerManager } from "./reducerManager";
import { StateSchema, ThunkExtraArg } from "./types/stateSchema";
import { authReducer } from "./auth/authSlice";

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        auth: authReducer,
        feed: feedReducer,
    };
    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate,
    };

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce as Reducer<StateSchema>,
        preloadedState: initialState,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    store.reducerManager = reducerManager;
    return store;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppThunkDispatch = ThunkDispatch<StateSchema, any, AnyAction>;
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
