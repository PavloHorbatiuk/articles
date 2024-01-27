import Header from "./../components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default layout;
