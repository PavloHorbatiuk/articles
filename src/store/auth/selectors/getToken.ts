import { StateSchema } from "store/types/stateSchema";

export const getToken = (state: StateSchema) => state.auth.authData?.token;
