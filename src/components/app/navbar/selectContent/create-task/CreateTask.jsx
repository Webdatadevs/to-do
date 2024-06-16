import { useDispatch, useSelector } from "react-redux";
import createTaskStyle from "../create-task/CreateTaskStyle.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchToDo } from "../../../../../redux/slice/todoSlice";
import { fetchToDoCategory } from "../../../../../redux/slice/categorySlice";

const CreateTask = ({load, setLoad}) => {
    const { todo } = useSelector((state) => state.todo);
    const { todoCategory } = useSelector((state) => state.todoCategory);
    const dispatch = useDispatch();

    const [task, setTask] = useState("");
    const [description, setDes] = useState("");
    const [categoryid, setCatid] = useState("");

    async function createTask(e) {
        setLoad(true)
        e.preventDefault();
        const obj = {
            task,
            description,
            category_id: categoryid,
        };
        await axios
            .post("http://todo.de-code.uz/api/tasks", obj, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("to-do-token"),
                },
            })
            .then((res) => {
                console.log(res);
                setLoad(false)
                dispatch(fetchToDo());
            })
            .catch((err) => {
                setLoad(false)
                console.log(err);
            });
    }
    useEffect(() => {
        dispatch(fetchToDo());
        dispatch(fetchToDoCategory())
    }, [dispatch, todoCategory.length]);
    return (
        <div className={createTaskStyle.wrapper}>
            <form onSubmit={(e) => createTask(e)}>
                <label>
                    <span>task name</span>
                    <input
                        onChange={(e) => setTask(e.target.value)}
                        value={task}
                        type="text"
                        placeholder="enter task name"
                    />
                </label>
                <label>
                    <span>task description</span>
                    <input
                        onChange={(e) => setDes(e.target.value)}
                        value={description}
                        type="text"
                        placeholder="Enter task description"
                    />
                </label>
                <label>
                    <span>select category</span>
                    <select onChange={(e) => setCatid(e.target.value)}>
                        {todoCategory?.map((item, index) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button>CREATE</button>
            </form>
        </div>
    );
};

export default CreateTask;
