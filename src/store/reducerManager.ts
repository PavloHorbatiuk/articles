import {
    type ReducersMapObject,
    combineReducers,
    type Reducer,
    type Action,
} from "@reduxjs/toolkit";
import {
    ReducerManager,
    StateSchema,
    StateSchemaKey,
} from "./types/stateSchema";

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: StateSchemaKey[] = [];

    return {
        getReducerMap: () => reducers,

        reduce: (state: StateSchema, action: Action) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    delete state[key];
                });
                keysToRemove = [];
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            return combinedReducer(state, action);
        },

        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;

            combinedReducer = combineReducers(reducers);
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            delete reducers[key];

            keysToRemove.push(key);

            combinedReducer = combineReducers(reducers);
        },
    };
}