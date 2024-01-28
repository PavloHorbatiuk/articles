import styled from "@emotion/styled";
import AuthForm from "components/AuthForm/AuthForm";

export const AuthPage = () => {
    return (
        <AuthContainer>
            <AuthForm />
        </AuthContainer>
    );
};
const AuthContainer = styled("div")({
    maxWidth: "400px",
    textAlign: "right",
    paddingTop: "10px",
    position: "relative",
    top: 50,
});
