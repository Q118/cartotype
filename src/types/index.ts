/** 
 * @type ResultItem
 * @description ResultItems are the items that are returned by the search function
 * as well as the item selected to be added to the store
 */
export type ResultItem = {
    id: string;
    description: string;
    imgUrl: string;
    downloadLocation: string;
    displayName: string;
    name: string;
    // price?: StorePrice|number;
    price?: number;
    // ! possible may need to chage price type
    storeTitle?: string;
}

export type StorePrice = {
    dollars: number;
    cents: number;
}

export type StoreItem = {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
};

export type StoreItemTag = {
    /** id of the store item it refers to */
    id: string;
    /** name of the store item it refers to */
    label: string;
}

/** use plain Note for the displaying notes i.e. holding the objects for the tags.. raw notes for backendish thigns */
export type Note = {
    id: string;
} & NoteData;

export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
    storeItemTags: StoreItemTag[];
}

export type Tag = {
    id: string;
    label: string;
    created_at?: string;
}


/** more for data in raw form, backend, fetching etc */
export type RawNote = {
    id: string;
} & RawNotedata;

export type RawNotedata = {
    title: string;
    // markdown: string | { rawText: string };
    markdown: any;
    created_at?: string;
    tagIds: string[];
    /** array of 0 or more storeItemIds that the note associated with */
    storeItemIds?: string[];
}

export type SimplifiedNote = {
    tags: Tag[];
    storeItemTags: StoreItemTag[];
    title: string;
    id: string;
}