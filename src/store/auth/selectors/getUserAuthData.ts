import { StateSchema } from "store/types/stateSchema";

export const getAuthData = (state: StateSchema) => state.auth.authData;
