import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function setupInterceptors() {
    // const navigate = useNavigate();
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log("intercepting response");
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            } else if (error.response.status === 403) {
                window.location.href = "/home";
            }
            return Promise.reject(error);
        }
    );

    axios.interceptors.request.use(
        (config) => {
            console.log("intercepting request");
            const token = localStorage.getItem("token");
            if (token != null) {
                config.headers.Authorization = "Bearer " + token;
            }

            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
}
