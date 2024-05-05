import { faEnvelope, faUser, faCamera, faIdBadge, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faMessage } from '@fortawesome/free-regular-svg-icons';

export const formFields = [
    {
        name: 'name',
        placeholder: 'Name',
        type: 'text',
        icon: faUser,
        validation: { required: 'This field is required' }
    },
    {
        name: 'userName',
        placeholder: 'Username',
        type: 'text',
        icon: faUserCircle,
        validation: { required: false }
    },
    {
        name: 'email',
        placeholder: 'Email',
        type: 'email',
        icon: faEnvelope,
        validation: { required: 'This field is required' }
    },
    {
        name: 'message',
        placeholder: 'Message',
        type: 'textarea',
        icon: faMessage,
        validation: { required: 'This field is required' }
    },
    {
        name: 'photoUpload',
        placeholder: 'JPG or PNG',
        type: 'file',
        icon: faCamera,
        validation: { required: 'This field is required' }
    },
    {
        name: 'workArea',
        placeholder: 'Select area',
        type: 'select',
        icon: faMapMarkerAlt,
        validation: { required: 'This field is required' },
        getOptions: () => []
    },
    {
        name: 'photographer',
        placeholder: 'Select a photographer',
        type: 'select',
        icon: faIdBadge,
        validation: { required: 'This field is required' },
        getOptions: () => []
    }
];