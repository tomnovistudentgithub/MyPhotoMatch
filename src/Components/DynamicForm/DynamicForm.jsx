import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DynamicForm({ config, onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {config.map((field, index) => (
                <div key={index}>
                    {field.icon && <FontAwesomeIcon icon={field.icon}/>}
                    {field.type !== 'textarea' ? (
                        <input {...register(field.name, field.validation)} placeholder={field.placeholder} type={field.type} />
                    ) : (
                        <textarea {...register(field.name, field.validation)} placeholder={field.placeholder} />
                    )}
                    {errors[field.name] && <p>{field.validation.message}</p>}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

export default DynamicForm;