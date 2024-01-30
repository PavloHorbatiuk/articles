import { StateSchema } from "store/types/stateSchema";

export const getIsLoading = (state: StateSchema) => state.auth.isLoading;
