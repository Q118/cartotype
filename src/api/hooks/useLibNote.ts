import { NoteData, StoreItemTag } from '../../types';
import { Notes as NoteConstructor } from '../lib/notes';
import { v4 as uuidv4 } from 'uuid';

export type NoteCrudItem = {
    item: NoteData
    note_id?: string;
    fetchCallback: (item: NoteData) => void;
    // clientConstructor: any;
};
// TODO: change from devNotes to prodNotes or whatever end up using or potentially using loginSession info for the folder name so we seperate the notes per folder/tenant/user
const NOTE_SUBPARTITION = 'dev';

export function useLibNote({ tags, ...data }: NoteData, fetchCallback: () => void, note_id: string = '') {
    const noteClient = new NoteConstructor(NOTE_SUBPARTITION);
    const handleStoreItemTags = (storeItemTags: StoreItemTag[]) => storeItemTags.map(tag => tag.id);

    async function onCreate() {
        let storeItemIds: string[] = [];
        if (data.storeItemTags) {
            storeItemIds = handleStoreItemTags(data.storeItemTags);
        }
        // this is all we need to do bc the effect will update the userNotes
        noteClient.addNote({
            title: data.title, id: uuidv4(),
            markdown: { "rawText": data.markdown },
            storeItemIds, tagIds: tags.map(tag => tag.id)
        }).then((res: any) => { fetchCallback(); }).catch((err: any) => {
            console.error(err);
        });
    }

    async function onUpdate() {
        let storeItemIds: string[] = [];
        if (data.storeItemTags) {
            storeItemIds = handleStoreItemTags(data.storeItemTags);
        }
        noteClient.updateNote({
            title: data.title, id: note_id, storeItemIds,
            markdown: { "rawText": data.markdown },
            tagIds: tags.map(tag => tag.id)
        }).then((res: any) => { fetchCallback(); }).catch((err: any) => {
            console.error(err);
        });
    }



    return {
        onCreate,
        onUpdate,
    };
}