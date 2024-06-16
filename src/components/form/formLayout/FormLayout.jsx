import formLayoutStyles from "./FormLayoutStyle.module.scss";

const FormLayout = ({ children }) => {
    return (
        <div className={formLayoutStyles.wrapper}>{children}</div>
    );
};

export default FormLayout;
