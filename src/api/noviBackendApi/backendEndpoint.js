import axios from 'axios';

const backendEndpoint = axios.create({
    baseURL: 'https://api.datavortex.nl/photomatch',
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': `photomatch:QfyA6Esqj11HHKDQKGPS`,
    },
});

export default backendEndpoint;
