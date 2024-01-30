import React from "react";
import { useForm, Controller } from "react-hook-form";
import { styled, Button, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSelector } from "react-redux";
import WarnInfo from "common/UIWidgets/WarnInfo/WarnInfo";
import { SEVERITY } from "common/const/enums";
import { ArticleFormType, validationSchema } from "./articleValidation";
import { getError } from "store/slices/articles/selectors/getError";
import { useLocation } from "react-router-dom";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import {
//     KeyboardDatePicker,
//     MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

export interface FormType {
    title?: string;
    description?: string;
    link?: string;
    confirmPassword?: string;
    pubDate: string;
}

export interface IProps {}

export const ArticleForm = () => {
    const { state } = useLocation();
    const { title, description, link, pubDate } = state.article;
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
    console.log(state, "state");
    // const dispatch = useDispatch<AppThunkDispatch>();
    // const isLoading = useSelector();
    // const { setAlert } = useContext(UIContext);

    // const postLogin = async (values: FormType) => {
    //     const result = await dispatch();
    //     if (result.meta.requestStatus === "fulfilled") {
    //         navigate(RoutePath.main);
    //         onSuccess && onSuccess();
    //         setAlert({
    //             show: true,
    //             message: checked ? "Created success" : "Login success",
    //             severity: "success",
    //         });
    //     }
    // };

    const onSubmit = handleSubmit((data) => console.log(data, "data"));

    return (
        <Form onSubmit={onSubmit}>
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
            {/* <Controller
                control={control}
                name='pubDate'
                render={({ field }) => (
                    <DatePicker
                        onChange={(date: Date) => field.onChange(date)}
                        selected={field.value}
                    />
                )}
            /> */}

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

            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
            {/* <Controller
                name='pubDate'
                control={control}
                render={({ field: { ...rest } }) => (
                    <KeyboardDatePicker
                        margin='normal'
                        id='date-picker-dialog'
                        label='Date picker dialog'
                        format='MM/dd/yyyy'
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                        {...rest}
                    />
                )}
            /> */}
            {/* </MuiPickersUtilsProvider> */}

            {requestsErrors && (
                <WarnInfo severity={SEVERITY.ERROR}>{requestsErrors}</WarnInfo>
            )}

            <Button color='primary' variant='contained' fullWidth type='submit'>
                Create article
            </Button>
        </Form>
    );
};

export const Form = styled("form")({
    "& .MuiTextField-root, .MuiButton-root, .MuiPaper-elevation, .MuiInput-underline":
        {
            marginBottom: 10,
        },
});
