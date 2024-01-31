import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { styled, Button, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch, useSelector } from "react-redux";
import WarnInfo from "common/UIWidgets/WarnInfo/WarnInfo";
import { SEVERITY } from "common/const/enums";
import { ArticleFormType, validationSchema } from "./articleValidation";
import { getError } from "store/slices/articles/selectors/getError";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import "react-datepicker/dist/react-datepicker.css";
import { RoutePath } from "routes/routerConfig";
import { updateArticle } from "store/slices/articles/updateArticle";
import { getIsLoading } from "store/auth/selectors/getIsloading";
import { UIContext } from "common/UIContext";
import { AppThunkDispatch } from "store/store";
import { createArticle } from "store/slices/articles/createArticle";

export interface ArticleForm {
    title?: string;
    description?: string;
    link?: string;
    pubDate?: Date | string;
}

export interface IProps {}

export const ArticleForm = () => {
    const { state, pathname } = useLocation();
    const articleData = state?.article?.data || {};
    const { title, description, link, pubDate, id, index } = articleData;
    const navigate = useNavigate();
    const isCreateRoute = pathname === "/create";
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ArticleFormType>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            title: title ?? "",
            description: description ?? "",
            link: link ?? "",
            pubDate: pubDate ? new Date(pubDate) : new Date(),
        },
    });
    const requestsErrors = useSelector(getError);
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoading = useSelector(getIsLoading);
    const { setAlert } = useContext(UIContext);

    const createPost = async (values: ArticleForm) => {
        const result = await dispatch(createArticle(values));
        if (result.meta.requestStatus === "fulfilled") {
            navigate(RoutePath.admin);
            setAlert({
                show: true,
                message: "Success",
                severity: "success",
            });
        }
    };

    const updateFetch = async (values: ArticleForm) => {
        const params = { ...values, id, index };
        const result = await dispatch(updateArticle(params));
        if (result.meta.requestStatus === "fulfilled") {
            setAlert({
                show: true,
                message: "Success",
                severity: "success",
            });
        }
    };

    const onSubmit = handleSubmit((data) =>
        isCreateRoute ? createPost(data) : updateFetch(data)
    );

    return (
        <Form onSubmit={onSubmit}>
            <ArrowWrapper>
                <NavLink to={RoutePath.admin}>
                    <ArrowBackIosIcon />
                </NavLink>
            </ArrowWrapper>
            <TextField
                label='Title'
                fullWidth
                error={Boolean(errors.title)}
                helperText={errors?.title?.message}
                minRows={5}
                {...register("title")}
            />
            <TextField
                color='primary'
                fullWidth
                minRows={3}
                rows={2}
                label='Description'
                error={Boolean(errors.description)}
                helperText={errors?.description?.message}
                InputProps={{
                    rows: "4",
                    multiline: true,

                    inputComponent: "textarea",
                }}
                {...register("description")}
            />
            <TextField
                label='Link'
                fullWidth
                error={Boolean(errors.link)}
                helperText={errors?.link?.message}
                minRows={5}
                {...register("link")}
            />
            <Typography variant='h5'> Date of publish:</Typography>
            <Controller
                control={control}
                name='pubDate'
                render={({ field: { onChange, onBlur, value } }) => (
                    <ReactDatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                    />
                )}
            />

            {requestsErrors && (
                <WarnInfo severity={SEVERITY.ERROR}>{requestsErrors}</WarnInfo>
            )}

            <Button
                disabled={isLoading}
                color='primary'
                variant='contained'
                fullWidth
                type='submit'
            >
                Create article
            </Button>
        </Form>
    );
};

export const Form = styled("form")({
    "& .MuiTextField-root, .MuiButton-root, .MuiPaper-elevation, .MuiInput-underline, .react-datepicker-wrapper":
        {
            marginBottom: 10,
        },
});
export const DatePicker = styled(ReactDatePicker)({
    "& input": {
        with: "100%",
        textAlign: "center",
        border: "none",
        backgroundColor: "transparent",
        borderBottom: " 2px solid #E3B924",
    },

    " &:focus ": {
        outline: "none",
    },
    "& .react-datepicker-wrapper": {},
});
export const ArrowWrapper = styled("div")({
    padding: "10px 0 20px 0",
});
