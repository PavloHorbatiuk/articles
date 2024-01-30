import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RoutePath } from "routes/routerConfig";
import useAuthStatus from "common/hooks/useAuthStatus";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth/authSlice";
import { useCallback, useRef } from "react";
import { SearchPanel } from "./SearchPanel";
import { articleActions } from "store/slices/articles/articleSlice";

export default function Header() {
    const { isLoggedIn, authData } = useAuthStatus();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timeRef = useRef<ReturnType<typeof setTimeout>>();

    const onLogout = useCallback(() => {
        dispatch(authActions.logout());
        navigate(RoutePath.auth);
    }, [dispatch, navigate]);

    const searchArticle = useCallback(
        (text: string) => {
            clearTimeout(timeRef.current);
            timeRef.current = setTimeout(() => {
                dispatch(articleActions.setSearchText(text));
            }, 500);
        },
        [dispatch]
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        <Link to={RoutePath.main}>News</Link>
                    </Typography>
                    <SearchPanel handleSearch={searchArticle} />
                    {authData?.role == "ADMIN" && (
                        <NavLink to={RoutePath.admin}>
                            <Button color='secondary'>Admin panel</Button>
                        </NavLink>
                    )}
                    {!isLoggedIn ? (
                        <NavLink to={RoutePath.auth}>
                            <Button color='secondary'>Login</Button>
                        </NavLink>
                    ) : (
                        <Button color='secondary' onClick={onLogout}>
                            Log out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
