import { styled } from "@mui/material";
import { ArticleForm } from "components/Feed/ArticleForm/ArticleForm";
import React from "react";

export const EditArticlePage = () => {
    return (
        <FormWrapper>
            <ArticleForm />
        </FormWrapper>
    );
};
const FormWrapper = styled("div")({
    maxWidth: "500px",
    padding: "6px",
});
