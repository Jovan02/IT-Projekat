import { useState, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [userToken, setUserToken] = useState(
        localStorage.getItem("token") || ""
    );

    const login = async (inputs) => {
        try {
            const response = await axios.post(`/api/api/auth/login`, inputs);
            const { token, ...other } = response.data;
            setUser(other);
            setUserToken(token);
        } catch (error) {
            console.log(error);
        }
    };

    const register = async (inputs) => {
        try {
            const response = await axios.post("/api/api/auth/register", inputs);
            login(inputs);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setUser(null);
        setUserToken("");
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem("token", userToken);
    }, [userToken]);

    return (
        <AuthContext.Provider
            value={{ user, setUser, login, logout, register }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
