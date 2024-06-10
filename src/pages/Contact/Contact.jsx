import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import styles from './Contact.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faCamera, faIdBadge, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular, faUserCircle, faMessage} from '@fortawesome/free-regular-svg-icons';
import getUserRoleEmail from "../../api/noviBackendApi/getUserRoleEmail.js";
import uploadPhoto from "../../api/noviBackendApi/uploadPhotoToApi.js/";
import uploadPhotoToApi from "../../api/noviBackendApi/uploadPhotoToApi.js";
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";
import matchPhotographersToUserTags from "../../helpers/matchPhotographersToUserTags.js";
import preparePhotoForUpload from "../../helpers/preparePhotoForUpload.js";
import {AuthContext} from "../../contexts/AuthContext.jsx";



function Contact() {
    const { register,  handleSubmit,setValue, getValues, formState: { errors } } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [username, setUsername] = useState('');
    const [errorPhotoUpload, setErrorPhotoUpload] = useState('');
    const [photographer, setPhotographer] = useState('');
    const { tagCounts } = useContext(PinnedPhotosContext);
    const [workAreas, setWorkAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [filteredPhotographers, setFilteredPhotographers] = useState([]);
    const [photographersInArea, setPhotographersInArea] = useState([]);
    const [formError, setFormError] = useState('');
    const { setResetForm, isLoggedIn } = useContext(AuthContext);
    const minimimPins = 5;

    useEffect(() => {
        if (tagCounts) {
            const matchingPhotographers = matchPhotographersToUserTags({ tagCounts });

            setFilteredPhotographers(matchingPhotographers);
            const uniqueWorkAreas = [...new Set(matchingPhotographers.map(photographer => photographer.workarea))];
            setWorkAreas(uniqueWorkAreas);
        }
    }, [tagCounts]);


    useEffect(() => {
        const photographersInSelectedArea = filteredPhotographers.filter(photographer => photographer.workarea === selectedArea);
        setPhotographersInArea(photographersInSelectedArea);
    }, [selectedArea, filteredPhotographers]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserRoleEmail();

                if (response) {
                    setValue('userName', `${response.username}`);
                    setUsername(`${response.username}`);
                    setValue('email', `${response.email}`);
                }

            } catch (error) {
    throw new Error('There was a problem with the API call:', error);
            }
        };
        fetchUserData();
    }, [setValue]);



    const onSubmit = async data => {
        const photoFile = data.photoUpload[0];
        const result = preparePhotoForUpload(username, photoFile);

        if (typeof result === 'string') {
            setErrorPhotoUpload(result);
        } else {
            try {
                const response = await uploadPhotoToApi(username, result);
                if (response) {
                    setFormData({
                        name: data.name,
                        email: data.email,
                        message: data.message,
                        photoUpload: photoFile.name
                    });
                    setIsModalOpen(true);
                } else {
                    throw new Error(' ');
                }
            } catch (error) {
                if (error.response) {
                    setErrorPhotoUpload('Error uploading photo: ' + error.message);
                } else {
                    setErrorPhotoUpload('Error uploading photo: ' + error.message);
                }
                setFormError('There was a problem submitting the form. Please try again.');
            }
        }
    };


    useEffect(() => {
        setResetForm(() => resetForm);
    }, [setResetForm]);

    const resetForm = () => {
        setValue('name', '');
        setValue('userName', '');
        setValue('email', '');
        setValue('message', '');
        setSelectedArea('');
        setPhotographer('');
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
            <div className={styles["parent-form-wrapper"]}>
                <div className={styles["form-wrapper"]}>
                    {!isLoggedIn && <p className={styles["isLoggedInCheck"]}>You must be logged in to contact a photographer.</p>}
                    {isLoggedIn && workAreas.length === 0 && <p className={styles["isLoggedInCheck"]}>We cannot determine your photo taste yet. In order to contact a matching photographer, please pin more photos. Generally between 10-15 photos should be sufficient.</p>}
                    <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
                        <h1>Contact</h1>
                        <p>Want to get in touch with a photographer of your choice? You are at the right place!
                            Make sure you have pinned enough photos so we can determine the best match. Once you have
                            enough pins you can select a location first, followed by the photographer.</p>

                        <div className={styles["input-label"]}>
                            <FontAwesomeIcon icon={faUser}/>
                            <input {...register("name", {required: true})} placeholder="Name"/>
                            {errors.name && <p>This field is required</p>}
                        </div>
                        <div className={styles["input-label"]}>
                            <FontAwesomeIcon icon={faUserCircle}/>
                            <input {...register("userName", {required: false})}
                                   placeholder="Username"
                                   disabled={!!username}
                            />
                        </div>

                        {errors.userName && <p>error</p>}
                        <div className={styles["input-label"]}>
                            <FontAwesomeIcon icon={faEnvelope}/>
                            <input {...register("email", {required: true})} placeholder="Email"/>
                        </div>
                        {errors.email && <p>This field is required</p>}

                        <div className={styles["input-label"]}>
                            <FontAwesomeIcon icon={faMessage}/>
                            <textarea {...register("message", {required: true})} placeholder="Message"
                                      className={styles.textarea}/>
                            {errors.message && <p>This field is required</p>}
                        </div>
                        <div className={styles["input-label"]}>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            <select id="workArea" required onChange={(e) => setSelectedArea(e.target.value)}
                                    className={styles["select-input"]}>
                                <option
                                    value="">{workAreas.length > 0 ? "Select area photoshoot" : "Pin more photos to see areas"}</option>
                                {workAreas.map((area, index) => (
                                    <option key={index} value={area}>
                                        {area}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles["input-label"]}>
                            <FontAwesomeIcon icon={faIdBadge}/>
                            <select id="photographer" required onChange={(e) => setPhotographer(e.target.value)}
                                    className={styles["select-input"]}>
                                <option
                                    value="">{workAreas.length > 0 ? "Select a photographer" : "Pin more photos to see photographers"}</option>
                                {photographersInArea.map((photographer, index) => (
                                    <option key={index} value={photographer.name}>
                                        {photographer.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles["input-label"]}>
                            <FontAwesomeIcon icon={faCamera}/>
                            <input className={styles["photo-upload"]}
                                   type="file" {...register("photoUpload", {required: true})} />

                            {errorPhotoUpload && <p>{errorPhotoUpload}</p>}
                            {errors.photoUpload && <p>This field is required</p>}
                        </div>
                        <button type="submit" disabled={!isLoggedIn || workAreas.length === 0}>Submit</button>
                    </form>


                    {formError && <p>{formError}</p>}

                    {isModalOpen && (
                        <div className={styles.modal}>
                            <div className={styles["modal-content"]}>
                                <h3>Thank you for your submission, we'll get back to you!</h3>
                                <p>Your submission:</p>
                                <p>Name: {formData.name}</p>
                                <p>Email: {formData.email}</p>
                                <p>Message: {formData.message}</p>
                                <p>Photo: {formData.photoUpload}</p>
                                <p>Work area: {selectedArea}</p>
                            <p>Photographer: {photographer}</p>
                            <button className={styles["modalButton"]} onClick={closeModal}>X</button>
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
}

export default Contact;