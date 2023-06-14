// import axios from 'axios';
import { StoreItem } from '../../types';
import { Notes as NotesConstructor } from './notes';

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
async function addStoreItem(item: Partial<StoreItem>) {
    const hasNotes = item.notes && item.notes.length > 0 && typeof item.notes !== "string";
    if (!hasNotes) {
        delete item.notes;
    }
    const { data, error } = await supabase.from('store_items').insert([ item ]);
    if (error) return handleError(error, {});
    if (!hasNotes) return data;
    const updatedNote = await handleAttachedNotes(item);
    return updatedNote;
}

// ! PU here dev.. the detail page, from edit, is not updating the notes to be checked. but it is in the db, so it's just a UI thing here to fix

/** helper to update notes when attached to an item to upsert */
async function handleAttachedNotes(item: any) {
    const NoteTable = NotesConstructor.create(NOTE_PARTITION_NAME);
    const noteToUpdate = await NotesConstructor.getNoteById(item.notes[ 0 ], NOTE_PARTITION_NAME) as any;
    // TODO above is retured as an array, fix up your typings to make that known better and not need an any
    if (!noteToUpdate || noteToUpdate == undefined) return;
    console.log('noteToUpdate', noteToUpdate)
    let storeIdsToSend: string[] | null = null;
    if (noteToUpdate.storeItemIds && noteToUpdate.storeItemIds.length > 0) {
        storeIdsToSend = [ ...noteToUpdate.storeItemIds, item.id ];
    } else {
        storeIdsToSend = [ item.id ];
    }
    console.log('storeIdsToSend', storeIdsToSend)
    const updatedNote = await NoteTable.updateNoteStoreItemIds(noteToUpdate[ 0 ].id, storeIdsToSend);

    return updatedNote;
}

async function updateStoreItem(item: Partial<StoreItem>) {
    const hasNotes = item.notes && item.notes.length > 0 && typeof item.notes !== "string";
    if (!hasNotes) {
        delete item.notes; // remove bc the db will throw an error if it's not an array of string or null
    }
    const { data, error } = await supabase.from('store_items').upsert(item).eq('id', item.id);
    if (error) handleError(error, {});
    if (!hasNotes) return data;
    const updatedNote = await handleAttachedNotes(item);
    return updatedNote;
}

export {
    getStoreItems,
    getStoreItem,
    addStoreItem,
    updateStoreItem,
}