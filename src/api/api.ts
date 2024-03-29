import axios from "axios";
import { USER_LOCAL_STORAGE_KEY } from "common/const/localStorage";
import { User } from "store/auth/types";

const authDataString: string | null = localStorage.getItem(
    USER_LOCAL_STORAGE_KEY
);

const authData: User | null = authDataString
    ? JSON.parse(authDataString)
    : null;

const token = authData ? authData.token : null;

export const $api = axios.create({
    baseURL: "https://article-server.onrender.com",
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

export enum URL {
    LOGIN = "auth/login",
    REGISTRATION = "auth/register",
    GET_ALL_ARTICLES = "articles",
    DELETE_ARTICLE = "articles/delete",
    UPDATE_ARTICLE = "articles/update",
    CREATE_ARTICLE = "articles/create",
}
