import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { styled, Button, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch, useSelector } from "react-redux";
import WarnInfo from "common/UIWidgets/WarnInfo/WarnInfo";
import { SEVERITY } from "common/const/enums";
import { ArticleFormType, validationSchema } from "./articleValidation";
import { getError } from "store/slices/articles/selectors/getError";
import { NavLink, useLocation } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import "react-datepicker/dist/react-datepicker.css";
import { RoutePath } from "routes/routerConfig";
import { updateArticle } from "store/slices/articles/updateArticle";
import { getIsLoading } from "store/auth/selectors/getIsloading";
import { UIContext } from "common/UIContext";
import { AppThunkDispatch } from "store/store";

export interface ArticleForm {
    title?: string;
    description?: string;
    link?: string;
    pubDate?: Date | string;
}

export interface IProps {}

export const ArticleForm = () => {
    const { state } = useLocation();
    const { title, description, link, pubDate, id, index } = state.article.data;
    console.log(state, "state");
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ArticleFormType>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            title,
            description,
            link,
            pubDate: new Date(pubDate),
        },
    });
    const requestsErrors = useSelector(getError);
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoading = useSelector(getIsLoading);
    const { setAlert } = useContext(UIContext);

    const postArticle = async (values: ArticleForm) => {
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

    const onSubmit = handleSubmit((data) => postArticle(data));

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
