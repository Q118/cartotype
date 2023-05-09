import axios from 'axios';
import { StoreItem } from '../types';

// * temp using jsonserver for mocking and focusing on logic
const BASE_URL = 'http://localhost:3001';


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://egbxdvrsptkzvjaqxwpi.supabase.co';
// const supabaseKey = import.meta.env.MODE === 'development' ? import.meta.env.VITE_DATABASE_API_KEY : process.env.DATABASE_API_KEY;
const supabaseKey = import.meta.env.VITE_DATABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)
// !!! PU HERE
// use the api docs in https://app.supabase.com/project/veiblggssnhvdmfiwpmx/editor/28668
// TODO:: keep going and get the new databse to replace all the jsonserver crap and the NOTes stff too...





// TODO update all usage of this method to await
async function getStoreItems() {
    // read all rows from the 'StoreItem' table
    let { data: storeItems, error } = await supabase.from('store_items').select('*');
    if (error) {
        console.log('error', error);
        return [];
    }
    return storeItems;
}


async function getStoreItem(id: string) {
    const { data, error } = await supabase.from('cities').select('*').eq('id', id);
    if (error) {
        console.log('error', error);
        return {};
    }
    return data;
}

async function addStoreItem(item: StoreItem) {
    const { data, error } = await supabase.from('store_items').insert([ item ]);
    if (error) {
        console.log('error', error);
        return {};
    }
    return data;
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