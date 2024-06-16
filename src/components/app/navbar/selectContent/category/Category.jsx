import { useDispatch, useSelector } from "react-redux";
import categoryStyle from "../category/CategoryStyle.module.scss";
import { AiFillDelete } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import CreateCategory from "../create-category/CreateCategory";
import { useEffect, useState } from "react";
import { fetchToDoCategory } from "../../../../../redux/slice/categorySlice";
import axios from "axios";
import Loading from "../../../../form/loading/Loading";

// Функция для форматирования даты
const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
};

const Category = () => {
    const { todoCategory } = useSelector((state) => state.todoCategory);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    async function deleteCategory(id) {
        setLoad(true);
        await axios
            .delete(`https://todo.de-code.uz/api/categories/${id}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("to-do-token"),
                },
            })
            .then((data) => {
                setLoad(false);
                // dispatch(fetchToDoCategory)
                dispatch(fetchToDoCategory());
            })
            .catch((err) => {
                console.log(err);
                setLoad(false);
            });
    }
    // useEffect(() => {
    //     console.log(todoCategory);
    // }, [dispatch, todoCategory.length]);
    return (
        <div className={categoryStyle.container}>
            <div className={categoryStyle.wrapper}>
                {todoCategory?.map((item) => (
                    <div
                        key={item.id}
                        className={categoryStyle["task-content"]}
                    >
                        <p className={categoryStyle["task-name"]}>
                            {item.name}
                        </p>
                        <div className={categoryStyle.texts}>
                            <div className={categoryStyle.text}>
                                <span>created at:</span>
                                <span>{formatDate(item.created_at)}</span>
                            </div>
                            {/* <div className={categoryStyle.text}>
                                <span>updated at:</span>
                                <span>
                                    {formatDate(item.category.updated_at)}
                                </span>
                            </div> */}
                        </div>
                        <div className={categoryStyle.btn}>
                            <button onClick={() => deleteCategory(item.id)}>
                                <AiFillDelete />
                            </button>
                            <button>
                                <IoIosCreate />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <CreateCategory load={load} setLoad={setLoad}/>
            {load && <Loading />}
        </div>
    );
};

export default Category;
