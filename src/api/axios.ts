import { config } from '../config';
import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';

const AUTH_HEADER = `Client-ID ${config.UPSPLASH_ACCESS_KEY}`;

// * download location...

/**
 * 
 * @param searchTerm {string}
 * @returns array of photo objects
 */
async function getPhotos(searchTerm: string = 'dog') {
    return axios
        .get(`${BASE_URL}/photos/random/?query=${searchTerm}&count=3`, { headers: { Authorization: AUTH_HEADER } })
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch((error: Error) => {
            throw new Error(error.message);
        });
}

export { getPhotos };
