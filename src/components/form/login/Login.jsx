import React, { useState } from "react";
import formStyles from "../formStyle/FormStyle.module.scss";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import setLocalStorage from "../saveLocalStorage/setLocalStorage";
import Loading from "../loading/Loading";

const Login = ({ onToggle, isloading, setLoad }) => {
    const [phone, setIphone] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem(`to-do-token`);
    async function setLogin(e) {
        e.preventDefault();
        const obj = {
            phone,
            password,
        };
        await axios
            .post("https://todo.de-code.uz/api/login", obj)
            .then((res) => {
                setLocalStorage(`to-do-token`, res.data.payload.token);
                setLoad(false)
                navigate("/");
            })
            .catch((err) => {
                setLoad(false)
                console.log(err);
            });
    }
    return !token ? (
        <>
            <div className={formStyles.container}>
                <div className={formStyles.content}>
                    <h2>LOGIN</h2>
                    <form
                        className={formStyles.form}
                        onSubmit={(e) => {
                            setLogin(e)
                            setLoad(true)
                        }}
                    >
                        <label>
                            <span>Телефон номер</span>
                            <input
                                required
                                value={phone}
                                onChange={(e) => setIphone(e.target.value)}
                                type="tel"
                                placeholder="Введите телефон номер"
                            />
                            <div className={formStyles.underline}></div>
                        </label>
                        <label>
                            <span>Пароль</span>
                            <input
                                required
                                value={password}
                                onChange={(e) => setPass(e.target.value)}
                                type="password"
                                placeholder="Введите пароль"
                            />
                            <div className={formStyles.underline}></div>
                        </label>
                        <button> ВХОД </button>
                    </form>
                    <button onClick={onToggle}>РЕГИСТРАЦИЯ</button>
                    {isloading ? <Loading /> : ""}
                </div>
            </div>
        </>
    ) : (
        <Navigate to={"/"} />
    );
};

export default Login;
