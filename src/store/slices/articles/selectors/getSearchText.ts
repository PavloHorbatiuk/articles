import { StateSchema } from "store/types/stateSchema";

export const getSearchText = (state: StateSchema) => state.article.search;
