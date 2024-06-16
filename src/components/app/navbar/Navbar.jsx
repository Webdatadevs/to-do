import React, { useState } from "react";
import navbarStyles from "./NavbarStyle.module.scss";
import Category from "./selectContent/category/Category";
import Task from "./selectContent/task/Task";
import CreateTask from "./selectContent/create-task/CreateTask";
import CreateCategory from "./selectContent/create-category/CreateCategory";
import { useSelector } from "react-redux";

const menuItems = [
    {
        id: 1,
        title: "CATEGORIES",
        content: Category,
        className: navbarStyles.modals,
    },
    {
        id: 2,
        title: "TASKS",
        content: Task,
        className: navbarStyles.modals,
        default:true
    },
    // {
    //     id: 3,
    //     title: "CREATE CATEGORY",
    //     content: CreateCategory,
    //     className: navbarStyles.modals,
    // },
    // {
    //     id: 4,
    //     title: "CREATE TASK",
    //     content: CreateTask,
    //     className: navbarStyles.modals,
    // },
];

const Navbar = () => {
    const {todo} = useSelector((state) => state.todo)
    const [activeItem, setActiveItem] = useState(+localStorage.getItem("sel") || 1);
    const [content, setContent] = useState("");

    const handleItemClick = (item) => {
        setActiveItem(item.id);
        localStorage.setItem("sel", item.id)
    };
    const ActiveContent =
        menuItems.find((item) => item.id === activeItem)?.content || null;
    return (
        <div className={navbarStyles.container}>
            <div className={navbarStyles["modal-wrapper"]}>
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`${item.className} ${
                            activeItem !== item.id
                                ? ""
                                : navbarStyles["modal-active"]
                        }`}
                        onClick={() => handleItemClick(item)}
                    >
                        {item.title}
                    </div>
                )) 
                }
            </div>
            <div>{ActiveContent  && <ActiveContent />}</div>
        </div>
    );
};

export default Navbar;
