import styles from './Button.module.css';

function Button({ onClick, children }) {
    return (
        <button className={styles['login-logout-button']} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;