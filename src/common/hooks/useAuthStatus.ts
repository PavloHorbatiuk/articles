import { useSelector } from "react-redux";
import { getAuthData } from "store/auth/selectors/getUserAuthData";

const useAuthStatus = () => {
    const authData = useSelector(getAuthData);

    const isLoggedIn = authData?.token && authData.token.length > 0;

    return {
        isLoggedIn,
        authData,
    };
};

export default useAuthStatus;
