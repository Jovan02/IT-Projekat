import { useEffect, useState, useRef } from "react";
import axios from "axios";

import "../styles/SearchBar.css";

const SearchBar = ({ type, reference }) => {
    const URL = "http://localhost:8000";

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);

    const inputRef = useRef();
    const itemRef = useRef([]);

    const loadData = async () => {
        try {
            const response = await axios.get(`${URL}/api/${type}`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = (e) => {
        const filter = e.target.value.toUpperCase();
        itemRef.current.forEach((item) => {
            if (item) {
                const txtValue = item.textContent || item.innerText;
                if (filter == "") {
                    item.style.display = "none";
                } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            }
        });
    };

    const handleFilterMovieClick = (e) => {
        inputRef.current.value = e.target.textContent;
        itemRef.current.forEach((item) => {
            if (item) {
                setSelectedData(e.target.dataset.key);
                item.style.display = "none";
            }
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div
            class={"dropdown " + type}
            data-selectedId={selectedData}
            ref={reference}
        >
            <div id="myDropdown" class="dropdown-content">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="search-icon"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>

                <input
                    type="text"
                    placeholder={type == "movies" ? "Movies..." : "Halls..."}
                    id="myInput"
                    onKeyUp={handleFilter}
                    ref={(e) => (inputRef.current = e)}
                />
                {data.map((item) => (
                    <div
                        className="search-result"
                        ref={(e) => itemRef.current.push(e)}
                        onClick={handleFilterMovieClick}
                        data-key={item.ID}
                    >
                        {item.Name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
