import { StateSchema } from "store/types/stateSchema";

export const getError = (state: StateSchema) => state.article.error;
