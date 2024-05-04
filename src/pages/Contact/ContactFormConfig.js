import { faEnvelope, faUser, faCamera, faIdBadge, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faMessage } from '@fortawesome/free-regular-svg-icons';

export function getContactFormConfig(workAreas, photographersInArea, username, email) {

    return [
        {
            name: 'name',
            placeholder: 'Name',
            type: 'text',
            className: 'input-label',
            icon: faUser,
            validation: { required: 'This field is required' }
        },
        {
            name: 'userName',
            placeholder: 'Username',
            type: 'text',
            className: 'input-label',
            icon: faUserCircle,
            defaultValue: username,
            validation: { required: false}
        },
        {
            name: 'email',
            placeholder: 'Email',
            type: 'email',
            className: 'input-label',
            icon: faEnvelope,
            defaultValue: email,
            validation: { required: 'This field is required' }
        },
        {
            name: 'message',
            placeholder: 'Message',
            type: 'textarea',
            className: 'input-label',
            icon: faMessage,

            validation: { required: 'This field is required' }
        },
        {
            name: 'photoUpload',
            placeholder: 'JPG or PNG',
            type: 'file',
            className: 'input-label',
            icon: faCamera,
            validation: { required: 'This field is required' }
        },
        {
            name: 'workArea',
            placeholder: 'Select area',
            type: 'select',
            className: 'select-input',
            icon: faMapMarkerAlt,
            options: workAreas,
            validation: { required: 'This field is required' }
        },
        {
            name: 'photographer',
            placeholder: 'Select a photographer',
            type: 'select',
            className: 'select-input',
            icon: faIdBadge,
            options: photographersInArea,
            validation: { required: 'This field is required' }
        }
    ];
}