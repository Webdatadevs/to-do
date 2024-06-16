import { BiLoaderCircle } from "react-icons/bi"; 
import React from "react";
import loadingStyle from "./LoadingStyle.module.scss";

const Loading = ({ isLoading, children }) => {
    return (
        <>
            <>
            <div className={loadingStyle.loading}>
                <img src="Animation - 1718266272589.gif" alt="loading" />
            </div>
        </>
        </>
    );
};

export default Loading;
