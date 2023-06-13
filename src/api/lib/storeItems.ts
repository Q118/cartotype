// import axios from 'axios';
import { StoreItem } from '../../types';
import { Notes } from './notes';

import { PostgrestError, createClient } from '@supabase/supabase-js'

const supabaseUrl = `https://${import.meta.env.VITE_SUPABASE_NAME}.supabase.co`;
// const supabaseKey = import.meta.env.MODE === 'development' ? import.meta.env.VITE_DATABASE_API_KEY : process.env.DATABASE_API_KEY;
const supabaseKey = import.meta.env.VITE_DATABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// TODO turn this into a class and have it extend the supabase table class just like in notes.ts

// TODO change this after development
const NOTE_PARTITION_NAME = 'dev';

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



//TODO need to also updates the notes to hold the attached store item id
async function addStoreItem(item: StoreItem) {
    const { data, error } = await supabase.from('store_items').insert([ item ]);
    if (error) return handleError(error, {});
    if (!item.notes) return data;
    // else {
        const updatedNote = await handleAttachedNotes(item);
        return updatedNote;
    // }


    // !!!! PU IN HERE... test this works and get it working for both add and update
    // const NoteTable = Notes.create(NOTE_PARTITION_NAME);
    // const noteToUpdate = await Notes.getNoteById(item.notes[ 0 ], NOTE_PARTITION_NAME) as any;
    // // TODO above is retured as an array, fix up your typings to make that known better and not need an any
    // console.log('noteToUpdate', noteToUpdate)

    // let storeIdsToSend: string[]|null = null;
    // if (noteToUpdate.storeItemIds && noteToUpdate.storeItemIds.length > 0) {
    //     storeIdsToSend = [ ...noteToUpdate.storeItemIds, item.id ];
    // } else {
    //     storeIdsToSend = [ item.id ];
    // }
    // console.log('storeIdsToSend', storeIdsToSend)
    // const updatedNote = await NoteTable.updateNoteStoreItemIds(noteToUpdate[0].id, storeIdsToSend);

    // return updatedNote;
}

/** helper to update notes when attached to an item to upsert */
async function handleAttachedNotes(item: any) {
    const NoteTable = Notes.create(NOTE_PARTITION_NAME);
    const noteToUpdate = await Notes.getNoteById(item.notes[ 0 ], NOTE_PARTITION_NAME) as any;
    // TODO above is retured as an array, fix up your typings to make that known better and not need an any
    console.log('noteToUpdate', noteToUpdate)

    let storeIdsToSend: string[]|null = null;
    if (noteToUpdate.storeItemIds && noteToUpdate.storeItemIds.length > 0) {
        storeIdsToSend = [ ...noteToUpdate.storeItemIds, item.id ];
    } else {
        storeIdsToSend = [ item.id ];
    }
    console.log('storeIdsToSend', storeIdsToSend)
    const updatedNote = await NoteTable.updateNoteStoreItemIds(noteToUpdate[0].id, storeIdsToSend);

    return updatedNote;
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