import styles from './Button.module.css';

function Button({ onClick, children, className }) {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;