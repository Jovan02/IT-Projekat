import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
} from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SingleMovie from "./pages/SingleMovie";
import Ticket from "./pages/Ticket";
import AdminPanel from "./pages/AdminPanel";
import Contact from "./pages/Contact";
import Browse from "./pages/Browse";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div class="main">
                <div class="title">
                    <h1>CINEMAXX</h1>
                </div>
                <div class="main-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/welcome",
        element: <Welcome />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/browse",
                element: <Browse />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/movie/:id",
                element: <SingleMovie />,
            },
            {
                path: "/ticket/:id",
                element: <Ticket />,
            },
            {
                path: "/admin-panel",
                element: <AdminPanel />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ],
    },
    {
        path: "/register",
        element: (
            <div class="main">
                <div class="title">
                    <h1>CINEMAXX</h1>
                </div>
                <div class="main-container">
                    <Register />
                </div>
            </div>
        ),
    },
    {
        path: "/login",
        element: (
            <div class="main">
                <div class="title">
                    <h1>CINEMAXX</h1>
                </div>
                <div class="main-container">
                    <Login />
                </div>
            </div>
        ),
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
