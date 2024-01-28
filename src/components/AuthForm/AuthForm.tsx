import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { styled, Button, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "../../store/store";
import { UIContext } from "common/UIContext";
import { signUpByEmail } from "store/auth/signUpByEmail";
import { authActions } from "store/auth/authSlice";
import WarnInfo from "common/UIWidgets/WarnInfo/WarnInfo";
import { loginUpByEmail } from "store/auth/loginUpByEmail";
import { AuthType, validationSchema } from "./validationSchema";
import { getAuthErrors } from "store/auth/selectors/getAuthErrors";
import { SEVERITY } from "common/const/enums";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "routes/routerConfig";

export interface FormType {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
    isConfirm: boolean;
}

export interface LoginFormProps {
    onSuccess?: () => void;
}
const defaultValues = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    isConfirm: false,
};
const AuthForm = ({ onSuccess }: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        unregister,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AuthType>({
        resolver: zodResolver(validationSchema),
        defaultValues,
    });
    const requestsErrors = useSelector(getAuthErrors);
    const dispatch = useDispatch<AppThunkDispatch>();
    const checked = watch("isConfirm");
    const navigate = useNavigate();
    console.log(requestsErrors, "request error");
    const { setAlert } = useContext(UIContext);

    const postLogin = async (values: FormType) => {
        const result = await dispatch(
            checked
                ? signUpByEmail({
                      name: values.name,
                      email: values.email,
                      password: values.password,
                  })
                : loginUpByEmail({
                      email: values.email,
                      password: values.password,
                  })
        );
        if (result.meta.requestStatus === "fulfilled") {
            dispatch(authActions.setError("Successful"));

            navigate(RoutePath.main);
            onSuccess && onSuccess();
            setAlert({
                show: true,
                message: checked ? "Created success" : "Login success",
                severity: "success",
            });
            dispatch(authActions.setError(""));
        }
    };

    const onSubmit = handleSubmit((data) => postLogin(data));

    const onSignUP = () => {
        setValue("isConfirm", !watch("isConfirm"));
        dispatch(authActions.setError(""));
    };

    const isSignUp = checked ? "Login" : "Sign up";
    const isLogin = !checked ? "Login" : "Sign up";

    useEffect(() => {
        if (checked) {
            register("confirmPassword");
            register("name");
        } else {
            unregister("confirmPassword");
            unregister("name");
        }
    }, [checked, register, unregister]);

    return (
        <Form onSubmit={onSubmit}>
            {checked ? (
                <TextField
                    label='Name'
                    fullWidth
                    type='name'
                    error={Boolean(errors?.name)}
                    helperText={errors?.name?.message}
                    {...register("name")}
                />
            ) : null}
            <TextField
                label='Email'
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors?.email?.message}
                {...register("email")}
            />
            <TextField
                fullWidth
                label='Password'
                type='password'
                error={Boolean(errors.password)}
                helperText={errors?.password?.message}
                {...register("password")}
            />

            {checked ? (
                <TextField
                    label='Confirm Password'
                    fullWidth
                    type='password'
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors?.confirmPassword?.message}
                    {...register("confirmPassword")}
                />
            ) : null}
            {requestsErrors && (
                <WarnInfo severity={SEVERITY.ERROR}>{requestsErrors}</WarnInfo>
            )}

            <Button color='primary' variant='contained' fullWidth type='submit'>
                {isLogin}
            </Button>
            <div>
                <Button color='inherit' onClick={onSignUP}>
                    {isSignUp}
                </Button>
            </div>
        </Form>
    );
};

export default AuthForm;
export const Form = styled("form")({
    "& .MuiTextField-root, .MuiButton-root, .MuiPaper-elevation, .MuiInput-underline":
        {
            marginBottom: 10,
        },
});
