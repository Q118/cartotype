import { config } from '../config';
import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';

const AUTH_HEADER = `Client-ID ${config.UPSPLASH_ACCESS_KEY}`;

// TODO create custom hook for the useing and then put into components like done in other apps

// * download location...
// do something with the image URLs, like embedding it in a hypothetical post
// $('img.post').attr('src', firstPhoto['urls']['regular']);

type PhotoItem = {
    id: string;
    description: string;
    imgUrl: string;
    downloadLocation: string;
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
                let photo = {
                    id: item.id,
                    description: description,
                    imgUrl: item.urls.regular,
                    downloadLocation: item.links.download_location,
                };
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
