export interface AuthSchema {
    authData?: User;
    email?: string;
    password?: string;
    isLoading?: boolean;
    error?: string;
}
export interface User {
    name: string;
    token: string;
    email: string;
    role?: string;
}
