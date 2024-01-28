import { Container } from "@mui/material";
import Header from "./../components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";

const layout = () => {
    return (
        <>
            <Header />
            <Container>
                <Main>
                    <Outlet />
                </Main>
            </Container>
        </>
    );
};

const Main = styled("main")({
    paddingTop: "10px",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
});
export default layout;
