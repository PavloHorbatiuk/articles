import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { articleActions } from "store/slices/articles/articleSlice";

interface IProps {
    handleSearch: (text: string) => void;
}

export const SearchPanel = ({ handleSearch }: IProps) => {
    const [searchText, setSearchText] = useState<string>("");
    const [showClearIcon, setShowClearIcon] = useState("none");
    const dispatch = useDispatch();

    const onSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleSearch(searchText.trim());
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchText(event.currentTarget.value);
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
    };

    const handleClick = (): void => {
        setSearchText("");
        dispatch(articleActions.setSearchText(""));
    };

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                value={searchText}
                onChange={handleChange}
                onKeyDown={onSearch}
                placeholder='Search…'
                inputProps={{
                    "aria-label": "search",
                }}
                endAdornment={
                    <InputAdornment
                        sx={{
                            display: showClearIcon,
                            paddingRight: "5px",
                            cursor: "pointer",
                        }}
                        position='end'
                        onClick={handleClick}
                    >
                        <ClearIcon />
                    </InputAdornment>
                }
            />
        </Search>
    );
};

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));
