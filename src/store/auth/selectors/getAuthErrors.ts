import { StateSchema } from "store/types/stateSchema";

export const getAuthErrors = (state: StateSchema) => state.auth.error;
