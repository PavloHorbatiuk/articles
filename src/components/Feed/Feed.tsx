import { Pagination, Stack } from "@mui/material";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "store/slices/articles/getAllArticle";
import { getArticles } from "store/slices/articles/selectors/getArticles";
import { AppThunkDispatch } from "store/store";
import ArticleItem from "./ArticleItem";
import { Article } from "store/slices/types";
import styled from "@emotion/styled";
import { getToken } from "store/auth/selectors/getToken";
import { getSearchText } from "store/slices/articles/selectors/getSearchText";

const Feed = () => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const { data, totalCount } = useSelector(getArticles);
    const token = useSelector(getToken);
    const search = useSelector(getSearchText);
    const [page, setPage] = useState(1);

    const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
        const fetchArticles = async () => {
            const params = { page: page, limit: 10, token: token };
            await dispatch(getAllArticles(params));
        };
        fetchArticles();
    }, [dispatch, page, token]);

    const filteringData = useMemo(() => {
        const filtering = data.filter((article) =>
            article.title.toLowerCase().includes(search)
        );
        return filtering;
    }, [data, search]);

    return (
        <div>
            {filteringData.map((article: Article, index) => (
                <ArticleItem key={index} data={article} index={index} />
            ))}
            <StackDiv spacing={2}>
                <Pagination
                    page={page}
                    onChange={handlePageChange}
                    count={Math.ceil(totalCount / 10)}
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
