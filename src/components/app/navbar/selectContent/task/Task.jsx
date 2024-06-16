import { AiFillCheckCircle } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import React, { useState } from "react";
import taskStyle from "../task/TaskStyle.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CreateTask from "../create-task/CreateTask";
import axios from "axios";
import { fetchToDo } from "../../../../../redux/slice/todoSlice";
import Loading from "../../../../form/loading/Loading";

const Task = () => {
    const { todo } = useSelector((state) => state.todo);
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch();

    async function deleteTask(id){
        setLoad(true)
        await axios.delete(`http://todo.de-code.uz/api/tasks/${id}`, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("to-do-token"),
            },
        })
        .then(res =>{
            console.log(res)
            dispatch(fetchToDo())
            setLoad(false)
        })
        .catch(err =>{
            console.log(err)
            setLoad(false)
        })
    }
    return (
        <>
            <div className={taskStyle.container}>
                <div className={`${taskStyle.wrapper}`}>
                    {todo?.map((item) => (
                        <div
                            key={item.id}
                            className={`${taskStyle["task-content"]} ${
                                item.is_done ? taskStyle.ispending : ""
                            }`}
                        >
                            <span>{item.category.name}</span>
                            <p className={taskStyle["task-name"]}>
                                {item.task}
                            </p>
                            <p className={taskStyle["desc"]}>
                                {item.description}
                            </p>
                            <div className={taskStyle.btn}>
                                <button
                                onClick={() =>deleteTask(item.id)}
                                >
                                    <AiFillDelete />
                                </button>
                                <button>
                                    <IoIosCreate />
                                </button>
                                <button disabled={item.is_done}>
                                    <AiFillCheckCircle />
                                </button>
                            </div>
                        </div>
                    ))}
                    {
                        load && <Loading/>
                    }
                </div>
                <CreateTask load={load} setLoad={setLoad}/>
            </div>
        </>
    );
};

export default Task;
