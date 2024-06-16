import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/app/container/Layout";
import AnimationForm from "./components/form/animateionForm/AnimationForm";
import { useEffect } from "react";
import { fetchToDo } from "./redux/slice/todoSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {


    // const { todo } = useSelector((state) => state.todo);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchToDo());
    // }, [dispatch]);

    // useEffect(() => {
    //     console.log(todo);
    // }, [todo]);

    return (
        <>
            <div className="box">
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route path="/auth" element={<AnimationForm />} />
                    <Route path="*" element={<Navigate to="/auth" />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
