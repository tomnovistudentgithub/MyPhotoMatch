import React from 'react';
import {Link} from "react-router-dom";
import styles from './NotFound.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret, faSearch } from '@fortawesome/free-solid-svg-icons';
function NotFound() {
    return <>
        <main className={styles['outer-wrapper']}>
            <div className={styles['content-wrapper']}>
                <div className={styles['icons-wrapper']}>
                    <FontAwesomeIcon className="detective-icon" icon={faUserSecret}/>
                    <FontAwesomeIcon className="search-icon" icon={faSearch}/>
                </div>
                <h1>Ooooh that's probably not what you expected...but we cannot find the page. Go back <Link
                    className="my-link" to="/">home.</Link>
                </h1>
            </div>
        </main>
    </>
}
export default NotFound;