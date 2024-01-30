import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "store/store";
import { deleteArticle } from "store/slices/articles/deleteArticle";
import { getToken } from "store/auth/selectors/getToken";
import { UIContext } from "common/UIContext";
import { Article } from "store/slices/types";
import { RoutePath } from "routes/routerConfig";
import { useNavigate } from "react-router-dom";

interface IProps {
    data: Article;
    index: number;
}

export const ArticleOptions = ({ data, index }: IProps) => {
    const disPatch = useDispatch<AppThunkDispatch>();
    const { setAlert } = useContext(UIContext);
    const token = useSelector(getToken);
    const navigate = useNavigate();

    const onDelete = async (id: number, index: number) => {
        const params = {
            id: data.id,
            index: index,
            token: token,
        };
        const result = await disPatch(deleteArticle(params));
        if (result.meta.requestStatus === "fulfilled") {
            setAlert({
                show: true,
                message: "Delete success",
                severity: "success",
            });
        }
    };

    const editArticle = (data: Article, index: number) => {
        navigate(RoutePath.edit, { state: { article: data } });
        console.log(data, index, "edit");
    };

    return (
        <div>
            <DeleteIcon
                sx={{ cursor: "pointer" }}
                color='primary'
                onClick={() => onDelete(data.id, index)}
            />
            <EditIcon
                sx={{ cursor: "pointer" }}
                color='success'
                onClick={() => editArticle(data, index)}
            />
        </div>
    );
};
