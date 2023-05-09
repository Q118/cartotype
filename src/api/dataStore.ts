import axios from 'axios';
import { StoreItem } from '../types';

// * temp using jsonserver for mocking and focusing on logic
const BASE_URL = 'http://localhost:3001';


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://egbxdvrsptkzvjaqxwpi.supabase.co';
const supabaseKey = import.meta.env.MODE === 'development' ? import.meta.env.VITE_DATABASE_API_KEY : process.env.DATABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)
// !!! PU HERE
// use the api docs in https://app.supabase.com/project/veiblggssnhvdmfiwpmx/editor/28668
// * and get the new databse to replace all the jsonserver crap -> get this done and then go.
// TODO:: keep going



// function getStoreItems() {
//     return axios
//         .get(`${BASE_URL}/storeItems`)
//         .then((response) => {
//             return response.data;
//         })
//         .catch((error: Error) => {
//             console.log('error in getStoreItems: ');
//             console.log(error.message);
//             return [];
//         });
// }

async function getStoreItems() {
    // read all rows from the 'StoreItem' table
    let { data: storeItems, error } = await supabase.from('store_items').select('*');
    if (error) {
        console.log('error', error);
        return [];
    }   
    console.log('storeItems', storeItems);
    return storeItems;
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

async function updateStoreItem(item: StoreItem) {
    return axios
        .put(`${BASE_URL}/storeItems/${item.id}`, item)
        .then((response) => {
            console.log('updated item in data store');
            return response.data;
        })
        .catch((error: Error) => {
            console.log('error in updateStoreItem: ');
            console.log(error.message);
            return {};
        });
}

export {
    getStoreItems,
    getStoreItem,
    addStoreItem,
    updateStoreItem,
}