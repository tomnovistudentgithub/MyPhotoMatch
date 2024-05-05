export const loginFields = [
    {
        label: 'Username',
        type: 'text',
        stateName: 'username',
    },
    {
        label: 'Password',
        type: 'password',
        stateName: 'password',
    },
];

export const registrationFields = [
    ...loginFields,
    {
        label: 'Email',
        type: 'email',
        stateName: 'email',
    },
];