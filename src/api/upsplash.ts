import { config } from '../config';
import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';



const AUTH_HEADER = import.meta.env.MODE === 'development' ? `Client-ID ${config.UPSPLASH_ACCESS_KEY}` : `Client-ID ${process.env.UPSPLASH_ACCESS_KEY}`;



// $('img.post').attr('src', firstPhoto['urls']['regular']);
// console.log(import.meta.env);
type PhotoItem = {
    id: string;
    description: string;
    imgUrl: string;
    downloadLocation: string;
    name: string;
    displayName: string;
    // download_location: string;
}

/**
 * 
 * @param searchTerm {string}
 * @returns array of photo objects
 */
async function getPhotosForSelection(searchTerm: string = '') {
    return axios
        .get(`${BASE_URL}/photos/random/?query=${searchTerm}&count=6`, { headers: { Authorization: AUTH_HEADER } })
        .then((response) => {
            let photos: PhotoItem[] = [];
            response.data.forEach((item: any) => {
                let description = item.description !== null ? item.description : item.alt_description || 'no description';
                let photo: PhotoItem = {
                    id: item.id,
                    description: description,
                    imgUrl: item.urls.regular,
                    downloadLocation: item.links.download_location,
                    name: item.user.name || item.user.username,
                    displayName: item.user.username
                };
                // let photo = {...item, description: description}
                photos.push(photo);
            });
            // return response.data
            return photos;
        })
        .catch((error: Error) => {
            // throw new Error(error.message);
            console.log('error in getPhotosForSelection: ')
            console.log(error.message);
            return [];
        });
}

export { getPhotosForSelection };
