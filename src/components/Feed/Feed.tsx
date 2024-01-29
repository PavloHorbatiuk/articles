import { Pagination, Stack } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "store/slices/articles/getAllArticle";
import { getArticles } from "store/slices/articles/selectors/getArticles";
import { AppThunkDispatch } from "store/store";
import ArticleItem from "./ArticleItem";
import { Article } from "store/slices/types";
import styled from "@emotion/styled";

const Feed = () => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const feed = useSelector(getArticles);
    const [page, setPage] = useState(1);

    const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    console.log(feed, "feed");

    useEffect(() => {
        const fetchArticles = async () => {
            const params = { page: page, limit: 10 };
            await dispatch(getAllArticles(params));
        };
        fetchArticles();
    }, [dispatch, page]);

    return (
        <div>
            {feed.data.map((article: Article, index) => (
                <ArticleItem key={index} data={article} />
            ))}
            <StackDiv spacing={2}>
                <Pagination
                    page={page}
                    onChange={handlePageChange}
                    count={Math.ceil(feed.totalCount / 10)}
                    color='primary'
                />
            </StackDiv>
        </div>
    );
};

export default Feed;
const StackDiv = styled(Stack)({
    padding: "5px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "flex-end",
});
