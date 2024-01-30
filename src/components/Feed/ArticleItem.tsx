import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Article } from "store/slices/types";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ArticleOptions } from "./ArtileOptions";
import { useLocation } from "react-router-dom";

interface IProps {
    data: Article;
    index: number;
}

const ArticleItem = React.memo(function ArticleItem({ data, index }: IProps) {
    const { title, pubDate, link, description } = data;
    const formattedDate = new Date(pubDate).toDateString();
    const location = useLocation();
    const isOnAdminRoute = location.pathname === "/admin";
    return (
        <BoxWrapper key={pubDate}>
            <PaperContainer>
                <Typography variant='h5' gutterBottom>
                    {title}
                </Typography>
                <div style={{ float: "right" }}>
                    {isOnAdminRoute && (
                        <ArticleOptions data={data} index={index} />
                    )}
                </div>
                <h2>{description}</h2>
                <Link href={link}>{link}</Link>
                <DateStyle>
                    <h2>{formattedDate}</h2>
                </DateStyle>
            </PaperContainer>
        </BoxWrapper>
    );
});

export default ArticleItem;

const BoxWrapper = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    padding: "5px",
    "& > :not(style)": {
        m: 1,
    },
});
const PaperContainer = styled(Paper)({
    padding: "10px",
    width: "100%",
});
const DateStyle = styled("div")({
    paddingTop: "5px",
    textAlign: "right",
});
