import axios from 'axios';

const backendEndpoint = axios.create({
    baseURL: 'https://api.datavortex.nl/photomatch',
    headers: {
        'Content-Type': 'application/json',
         'X-Api-Key': import.meta.env.VITE_PHOTOMATCH_ACCESS_KEY,
    },
});

export default backendEndpoint;
