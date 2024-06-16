import { AiOutlineLogout } from "react-icons/ai"; 
import { FaMoon } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import React from "react";
import headerStyles from "./HeaderStyle.module.scss";
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
    // Manage Your Tasks Efficiently
    const navigate = useNavigate()
    function clearLoacalStorage(){
        localStorage.clear()
        navigate("/auth")
    }

    return (
        <>
            <div className={headerStyles.header}>
                <h1>
                    <span>To-Do </span>App
                </h1>
                <div className={headerStyles["btn-wrapper"]}>
                    <button className="">
                        <AiOutlineSearch />
                    </button>
                    <button>
                        <FaMoon />
                    </button>
                    <button onClick={clearLoacalStorage}>
                        <AiOutlineLogout />
                    </button>
                </div>
                <form>
                    <input type="search" placeholder="serach your to-do" />
                </form>
            </div>
        </>
    );
};

export default Header;
