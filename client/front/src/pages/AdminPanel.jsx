import React, { useEffect, useRef } from "react";
import "../styles/AdminPanel.css";
import { useState } from "react";
import ManageUsers from "../components/ManageUsers";
import AddMovie from "../components/AddMovie";
import AddScreening from "../components/AddScreening";

const AdminPanel = () => {
    const [selectedTab, setSelectedTab] = useState(1);

    const handleChooseTab = (e) => {
        if (e.target.innerHTML === "Manage Users") {
            setSelectedTab(1);
        } else if (e.target.innerHTML === "Add movie") {
            setSelectedTab(2);
        } else if (e.target.innerHTML === "Add projection") {
            setSelectedTab(3);
        }
    };

    return (
        <>
            <div class="choice-buttons">
                <button
                    className={
                        "button " +
                        (selectedTab == 1 ? "choice-buttons--selected" : "")
                    }
                    onClick={handleChooseTab}
                >
                    Manage Users
                </button>
                <button
                    class={
                        "button " +
                        (selectedTab == 2 ? "choice-buttons--selected" : "")
                    }
                    onClick={handleChooseTab}
                >
                    Add movie
                </button>
                <button
                    class={
                        "button " +
                        (selectedTab == 3 ? "choice-buttons--selected" : "")
                    }
                    onClick={handleChooseTab}
                >
                    Add projection
                </button>
            </div>

            {selectedTab == 1 && <ManageUsers />}

            {selectedTab == 2 && <AddMovie />}

            {selectedTab == 3 && <AddScreening />}
        </>
    );
};

export default AdminPanel;
