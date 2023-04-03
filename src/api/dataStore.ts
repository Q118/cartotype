import axios from 'axios';
import { StoreItem } from '../types';

// * temp using jsonserver for mocking and focusing on logic
const BASE_URL = 'http://localhost:3001';



function getStoreItems() {
    return axios
        .get(`${BASE_URL}/storeItems`)
        .then((response) => {
            return response.data;
        })
        .catch((error: Error) => {
            console.log('error in getStoreItems: ');
            console.log(error.message);
            return [];
        });
}

async function getStoreItem(id: string) {
    return axios
        .get(`${BASE_URL}/storeItems/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error: Error) => {
            console.log('error in getStoreItem: ');
            console.log(error.message);
            return [];
        });
}

async function addStoreItem(item: StoreItem) {
    return axios
        .post(`${BASE_URL}/storeItems`, item)
        .then((response) => {
            console.log('added item to data store');
            return response.data;
        })
        .catch((error: Error) => {
            console.log('error in addStoreItem: ');
            console.log(error.message);
            return [];
        });
}

export {
    getStoreItems,
    getStoreItem,
    addStoreItem,
}