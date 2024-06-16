import React from "react";
import Header from "../header/Header";
import Main from "./../main/Main";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Navigate } from "react-router-dom";
import layoutStyle from "../container/LayoutStyle.module.scss"

const Layout = ({ children }) => {
    const token = localStorage.getItem(`to-do-token`);
    return token ? (
        <>
            <div className={layoutStyle.content}>
                <Header />
                <Navbar />
                <Main />
                <Footer />
            </div>
        </>
    ) : (
        <Navigate to={"/auth"} />
    );
};

export default Layout;
