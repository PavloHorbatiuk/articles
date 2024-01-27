import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Routing } from "./routes/routing";
import { UIContextProvider } from "./common/UIContext";
import { ThemeProvider, styled } from "@mui/material";
import { theme } from "styles/theme";

function App() {
    return (
        <MainContainer>
            <ThemeProvider theme={theme}>
                <UIContextProvider>
                    <RouterProvider router={Routing} />
                </UIContextProvider>
            </ThemeProvider>
        </MainContainer>
    );
}

const MainContainer = styled("div")({
    color: "darkslategray",
    backgroundColor: "aliceblue",
    minHeight: "100vh",
});
export default App;
