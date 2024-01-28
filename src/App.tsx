import React, { useEffect } from "react";
import { RouterProvider, redirect } from "react-router-dom";
import { Routing } from "./routes/routing";
import { UIContextProvider } from "./common/UIContext";
import { ThemeProvider, styled } from "@mui/material";
import { theme } from "styles/theme";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "store/store";
import { authActions } from "store/auth/authSlice";
import { RoutePath } from "routes/routerConfig";

function App() {
    const dispatch = useDispatch<AppThunkDispatch>();

    useEffect(() => {
        dispatch(authActions.initAuthData());
        redirect(RoutePath.auth);
    }, [dispatch]);

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
