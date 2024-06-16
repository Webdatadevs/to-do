import React, { useState } from "react";
import formStyles from "../formStyle/FormStyle.module.scss";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import setLocalStorage from "../saveLocalStorage/setLocalStorage";
import Loading from "../loading/Loading";

const Registr = ({ onToggle, isloading, setLoad }) => {
    const [name, setUserName] = useState("");
    const [phone, setIphone] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    async function setAuth(e) {
        e.preventDefault();
        const obj = {
            name,
            phone,
            password,
        };
        await axios
            .post("https://todo.de-code.uz/api/register", obj)
            .then((res) => {
                setLocalStorage(`to-do-token`, res.data.payload.token);
                setLoad(false);
                navigate("/");
            })
            .catch((err) => {
                setLoad(false);
                console.log(err);
            });
    }
    return (
        <>
            <div className={formStyles.container}>
                <div className={formStyles.content}>
                    <h2>AUTHORIZATION</h2>
                    <form
                        className={formStyles.form}
                        onSubmit={(e) => {
                            setAuth(e);
                            setLoad(true);
                        }}
                    >
                        <label>
                            <span>Имя пользователя</span>
                            <input
                                required
                                value={name}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                placeholder="Введите имя пользователя"
                            />
                            <div className={formStyles.underline}></div>
                        </label>
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
                        <button>РЕГИСТРАЦИЯ</button>
                    </form>
                    <button onClick={onToggle}>ВХОД</button>
                    {isloading ? <Loading /> : ""}
                </div>
            </div>
        </>
    );
};

export default Registr;
