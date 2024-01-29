import { StateSchema } from "store/types/stateSchema";

export const getArticles = (state: StateSchema) => state.article.feed;
