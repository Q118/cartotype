// import axios from 'axios';
import { StoreItem } from '../../types';


import { PostgrestError, createClient } from '@supabase/supabase-js'

const supabaseUrl = `https://${import.meta.env.VITE_SUPABASE_NAME}.supabase.co`;
// const supabaseKey = import.meta.env.MODE === 'development' ? import.meta.env.VITE_DATABASE_API_KEY : process.env.DATABASE_API_KEY;
const supabaseKey = import.meta.env.VITE_DATABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const handleError = (error: PostgrestError, retValue: any) => {
    console.log('error', error);
    return retValue;
}

async function getStoreItems() {
    // read all rows from the 'StoreItem' table
    let { data: storeItems, error } = await supabase.from('store_items').select('*').order('name', { ascending: true });
    if (error) handleError(error, []);
    return storeItems;
}


async function getStoreItem(id: string) {
    const { data, error } = await supabase.from('store_items').select('*').eq('id', id);
    if (error) handleError(error, {});
    return data;
}

async function addStoreItem(item: StoreItem) {
    const { data, error } = await supabase.from('store_items').insert([ item ]);
    if (error) handleError(error, {});
    return data;
}

async function updateStoreItem(item: StoreItem) {
    const { data, error } = await supabase.from('store_items').upsert(item).eq('id', item.id);
    if (error) handleError(error, {});
    return data;
}

export {
    getStoreItems,
    getStoreItem,
    addStoreItem,
    updateStoreItem,
}