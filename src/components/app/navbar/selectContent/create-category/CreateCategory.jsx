import { useState } from "react";
import createCategoryStyle from "../create-category/CreatCategoryStyle.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchToDoCategory } from "../../../../../redux/slice/categorySlice";
import Loading from "../../../../form/loading/Loading";

const CreateCategory = ({load, setLoad}) => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    async function createCategory(e) {
        setLoad(true);
        e.preventDefault();
        const obj = {
            name,
        };
        await axios
            .post("https://todo.de-code.uz/api/categories", obj, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("to-do-token"),
                },
            })
            .then((data) => {
                setLoad(false);
                dispatch(fetchToDoCategory());
            })
            .catch((err) => {
                console.log(err);
                setLoad(false);
            });
    }
    return (
        <div className={createCategoryStyle["form-wrapper"]}>
            <form onSubmit={(e) => createCategory(e)}>
                <label>
                    <span>category name</span>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="text"
                        placeholder="category name"
                    />
                </label>
                <label className={createCategoryStyle.creat}>
                    <button>CREAT</button>
                </label>
           
            </form>
        </div>
    );
};

export default CreateCategory;
