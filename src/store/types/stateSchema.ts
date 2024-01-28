import {
    type EnhancedStore,
    type ReducersMapObject,
    type Reducer,
    type Action,
} from "@reduxjs/toolkit";
import { type AxiosInstance } from "axios";
import { type NavigateOptions, type To } from "react-router-dom";
import { FeedSchema } from "../slices/types";
import { AuthSchema } from "store/auth/types";

export interface StateSchema {
    feed: FeedSchema;
    auth: AuthSchema;

    // async reducer
}

export type StateSchemaKey = keyof StateSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: Action) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
