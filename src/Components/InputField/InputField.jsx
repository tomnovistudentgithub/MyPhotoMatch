import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./InputField.module.css";

function InputField({ type, name, placeholder, register, error, icon, disabled }) {
    return (
        <div className={styles["input-label"]}>
            <FontAwesomeIcon icon={icon}/>
            <input type={type} {...register(name, {required: true})} placeholder={placeholder} disabled={disabled}/>
            {error && <p>This field is required</p>}
        </div>
    );
}

export default InputField;