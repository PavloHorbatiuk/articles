import { USER_LOCAL_STORAGE_KEY } from "common/const/localStorage";
import React from "react";
import { LazyRouteFunction, RouteObject } from "react-router";
import { LoaderFunction, redirect } from "react-router-dom";

export enum AppRoutes {
    MAIN = "main",
    ADMIN_PANEL = "admin",
    NOT_FOUND = "notFound",
    AUTH = "auth",
    EDIT_ARTICLE = "edit",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.ADMIN_PANEL]: "/admin",
    [AppRoutes.AUTH]: "/login",
    [AppRoutes.EDIT_ARTICLE]: "/edit",
    [AppRoutes.NOT_FOUND]: "*",
};

export interface RouteSchema {
    path?: string;
    element?: React.ReactNode;
    index?: boolean;
    lazy?: LazyRouteFunction<RouteObject>;
    loader?: LoaderFunction<unknown> | undefined;
}

const routeConfig: Record<AppRoutes, RouteSchema> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        index: true,
        async lazy() {
            const { FeedPage } = await import("../pages/FeedPage");
            return { Component: FeedPage };
        },
        async loader() {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (!user) {
                throw redirect(RoutePath.auth);
            }
            return null;
        },
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: RoutePath.admin,
        async lazy() {
            const { AdminPage } = await import("../pages/AdminPage");
            return { Component: AdminPage };
        },
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.notFound,
        async lazy() {
            const { PageNotFound } = await import("../pages/PageNotFound");
            return { Component: PageNotFound };
        },
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        async lazy() {
            const { AuthPage } = await import("../pages/AuthPage");
            return { Component: AuthPage };
        },
        async loader() {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (user) {
                throw redirect(RoutePath.main);
            }
            return null;
        },
    },
    [AppRoutes.EDIT_ARTICLE]: {
        path: RoutePath.edit,
        async lazy() {
            const { EditArticlePage } = await import(
                "../pages/EditArticlePage"
            );
            return { Component: EditArticlePage };
        },
    },
};

const routeConfigArray: RouteSchema[] = Object.values(routeConfig);

export { routeConfig, routeConfigArray };
