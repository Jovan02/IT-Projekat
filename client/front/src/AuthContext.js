import { useState, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const URL = "http://localhost:8000";

    const [user, setuser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [userToken, setUserToken] = useState(
        localStorage.getItem("token") || ""
    );

    const login = async (inputs) => {
        const response = await axios.post(`${URL}/api/auth/login`, inputs);
        const { token, ...other } = response.data;
        setuser(other);
        setUserToken(token);
        console.log(response.data.username);
    };

    const logout = () => {
        setuser(null);
        setUserToken("");
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem("token", userToken);
    }, [userToken]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
