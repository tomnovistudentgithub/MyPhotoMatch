import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DynamicForm.module.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";

function DynamicForm({ config, onSubmit, setValue, defaultValues, selectedArea, setSelectedArea, photographers}) {
    const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues });
    const [selectedPhotographer, setSelectedPhotographer] = useState('');
    const [filteredPhotographers, setFilteredPhotographers] = useState([]);
    const [localPhotographersInArea, setLocalPhotographersInArea] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {

        config.forEach(field => {
            console.log(field.name, field.validation);
            register(field.name, field.validation);
        });
    }, [register, config]);

    useEffect(() => {
        const photographerField = config.find(field => field.name === 'photographer');
        if (photographerField) {
            const filtered = photographerField.options.filter(photographer => photographer.workarea === selectedArea);
            setLocalPhotographersInArea(filtered);
        }
    }, [selectedArea, config]);


    useEffect(() => {
        console.log(photographers);
        if (Array.isArray(photographers)) {
            const initialPhotographersInArea = photographers.filter(photographer => photographer.workarea === selectedArea);
            setLocalPhotographersInArea(initialPhotographersInArea);
        }
    }, []);

    const handleAreaChange = (e) => {
        setSelectedArea(e.target.value);
        const filteredPhotographers = photographers.filter(photographer => photographer.workarea === e.target.value);
        setLocalPhotographersInArea(filteredPhotographers);
    };



    return (
        <>
            <div className={styles['form-wrapper-dynamic']}>
            <h1> Contact Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {config.map((field, index) => (
                <div key={index} className={styles[field.className]}>
                    {field.icon && <FontAwesomeIcon icon={field.icon} className={styles['input-icon-wrapper']}/>}
                    {field.type !== 'textarea' && field.type !== 'select' ? (
                        <input {...register(field.name, field.validation)} placeholder={field.placeholder}
                               type={field.type} className={styles.input} defaultValue={field.defaultValue}
                               disabled={field.name === 'userName' && !!field.defaultValue || !isLoggedIn}/>
                    ) : field.type === 'select' ? (
                        <select {...register(field.name, field.validation)}
                                placeholder={!isLoggedIn ? "Please log in first" : field.placeholder}
                                className={styles.input} defaultValue={field.defaultValue} disabled={!isLoggedIn}
                                onChange={field.name === 'workArea' ? handleAreaChange : null}>
                            {field.name === 'photographer' ? localPhotographersInArea.map((option, index) => (
                                <option key={index} value={option.name}>
                                    {option.name}
                                </option>
                            )) : field.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <textarea {...register(field.name, field.validation)}
                                  placeholder={!isLoggedIn ? "Please log in first" : field.placeholder}
                                  className={styles.textarea} defaultValue={field.defaultValue} disabled={!isLoggedIn}/>
                    )}
                    {errors[field.name] && <p>{errors[field.name].message}</p>}
                </div>
            ))}
            <button type="submit" className={styles.button} disabled={!isLoggedIn}>Submit</button>
        </form>
        </div>
</>

)
    ;
}


export default DynamicForm;