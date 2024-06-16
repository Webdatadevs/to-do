import React, { useState } from "react";
import animationStyle from "./AnimationFormStyle.module.scss";
import Registr from "../register/Registr";
import Login from "../login/Login";
import FormLayout from "../formLayout/FormLayout";

const AnimationForm = () => {
    const [toggleClick, setToggleClick] = useState(false);
    const [isloading, setLoad] = useState(false);

    const handleToggle = () => {
        setToggleClick(prevState => !prevState);
    };
    
    return (
        <FormLayout>
            <div className={`${animationStyle.formContainer} ${toggleClick ? animationStyle.flipped : ""}`}>
                <div className={animationStyle.front}>
                    <Registr isloading={isloading} setLoad={setLoad} onToggle={handleToggle} />
                </div>
                <div className={animationStyle.back}>
                    <Login isloading={isloading} setLoad={setLoad} onToggle={handleToggle} />
                </div>
            </div>
        </FormLayout>
    );
};

export default AnimationForm;
