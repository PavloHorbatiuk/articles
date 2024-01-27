import React from "react";
import { LazyRouteFunction, RouteObject } from "react-router";

export enum AppRoutes {
    MAIN = "main",
    ADMIN_PANEL = "admin",
    NOT_FOUND = "notFound",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.ADMIN_PANEL]: "/admin",
    [AppRoutes.NOT_FOUND]: "*",
};

export interface RouteSchema {
    path?: string;
    element?: React.ReactNode;
    index?: boolean;
    lazy?: LazyRouteFunction<RouteObject>;
}

const routeConfig: Record<AppRoutes, RouteSchema> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        index: true,
        async lazy() {
            const { FeedPage } = await import("../pages/FeedPage");
            return { Component: FeedPage };
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
};

const routeConfigArray: RouteSchema[] = Object.values(routeConfig);

export { routeConfig, routeConfigArray };
