import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink, useLocation} from "react-router-dom";
import styles from './NavBar.module.css';

function NavItem({ to, icon, text, setIsOpen }) {
    let location = useLocation();
    let isActive = location.pathname === to;

    const handleClick = () => {
        setIsOpen(false);
    };

    return (
        <li onClick={handleClick} className={isActive ? styles['active-link'] : ''}>
            <NavLink
                to={to}
                className={`${styles['nav-link']} ${isActive ? styles['active-link'] : ''}`}
            >
                <FontAwesomeIcon className={styles['nav-icon']} icon={icon}/>
                <span className={styles['nav-text']}>{text}</span>
            </NavLink>
        </li>
    );
}

export default NavItem;