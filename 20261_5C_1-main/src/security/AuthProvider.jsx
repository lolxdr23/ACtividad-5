import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { loginRequest } from "../services/authService";

function AuthProvider({ children }) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const storedSession = localStorage.getItem("session");

        if (storedSession) {
            setSession(JSON.parse(storedSession));
        }
    }, []);

    const login = async (username, password) => {
        const data = await loginRequest({ username, password });

        const newSession = {
            username,
            token: data.token,
        };

        setSession(newSession);
        localStorage.setItem("session", JSON.stringify(newSession));

        return true;
    };

    const logout = () => {
        localStorage.removeItem("session");
        setSession(null);
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                login,
                logout,
                isLoggedIn: !!session?.token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

