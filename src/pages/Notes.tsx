import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Container from 'react-bootstrap/Container';

import { NoteData, RawNote, StoreItemTag, Tag, StoreItem } from '../types';
import { Note, NewNote, NoteList, NoteLayout, EditNote } from '../components/notes';
import { Notes as NoteConstructor } from '../api/lib/notes';
import { MdEditNote } from 'react-icons/md';
import { Tags as TagConstructor } from '../api/lib/tags';
import { useLibNote } from '../api/hooks/useLibNote';
import { useShoppingCart } from '../context/ShoppingCartContext';

// TODO; displayyyy teh storeItemTagss ;; confirmed they are mapped correctly
// dusplay them in the LIST
// // and also make them shop up in the edit form


// TODO[future]: change from devNotes to prodNotes or whatever end up using or potentially using loginSession info for the folder name so we seperate the notes per folder/tenant/user
const NOTE_SUBPARTITION = 'dev';
const TAG_SUBPARTITION = 'dev';



export function Notes() {
    /** notes and tags for the current user session */
    const [ userNotes, setUserNotes ] = useState<RawNote[]>([]);
    const [ userTags, setUserTags ] = useState<Tag[]>([]);

    const { addNotificationToast, globalStoreItems, globalStoreItemTags } = useShoppingCart();
    const queryObject = {};

    const { data: notes, isLoading, error: notesError, refetch: refetchNotes, isFetching }: any = useQuery({
        queryKey: [ `get-all-notes` ],
        queryFn: async () => await NoteConstructor.getAllNotes(NOTE_SUBPARTITION),
        enabled: true,
    });
    // todo may need the loading and errors...
    const { data: tags, isLoading: tagsLoading, error: tagsError, refetch: refetchTags, isFetching: isTagFetching }: any = useQuery({
        queryKey: [ `get-all-tags` ],
        queryFn: async () => await TagConstructor.getAllTags(TAG_SUBPARTITION),
        enabled: true,
    });

    useEffect(() => { if (notes) setUserNotes(notes); }, [ notes ]);
    useEffect(() => { if (tags) setUserTags(tags); }, [ tags ]);

    const notesWithTags = useMemo(() => {
        return userNotes?.map((note: any) => {
            return {
                ...note,
                tags: userTags.filter(tag => note.tagIds?.includes(tag.id)),
                storeItemTags: globalStoreItemTags.filter(storeItemTag => note.storeItemIds?.includes(storeItemTag.id))
            }
        }) // this will be a note with the tags array populated
    }, [ userNotes, userTags ]);


    /**  post it to the data base */
    function onCreateNote({ tags, ...data }: NoteData) {
        const { onCreate } = useLibNote({ tags, ...data }, refetchNotes);
        onCreate().then(() => addNotificationToast(`Successfully created note, ${data.title}`));
        return;
    }

    function onUpdateNote(id: string, { tags, ...data }: NoteData) {
        const { onUpdate } = useLibNote({ tags, ...data }, refetchNotes, id);
        onUpdate().then(() => addNotificationToast(`Successfully updated note, ${data.title}`));
        return;
    }

    function onDeleteNote(id: string) {
        // TODO set alert to confirm delete and move this into the hooklib
        let userConfirm = window.confirm('Are you sure you want to delete this note?');
        if (!userConfirm) return;
        const noteClient = new NoteConstructor(NOTE_SUBPARTITION);
        noteClient.deleteNote(id).then((res: any) => {
            addNotificationToast(`Successfully deleted note!`);
            refetchNotes();
        }).catch((err: any) => {
            console.error(err);
        });
    }

    function addTag(tag: Tag) {
        const tagClient = new TagConstructor(TAG_SUBPARTITION);
        tagClient.addTag(tag).then((res: any) => { refetchTags(); }).catch((err: any) => {
            console.error(err);
        });
    }
    function updateTag(id: string, label: string) {
        // setUserTags(prevTags => {
        //     return prevTags.map(tag => {
        //         if (tag.id !== id) return tag;
        //         return { ...tag, label }
        //     })
        // })
        const tagClient = new TagConstructor(TAG_SUBPARTITION);
        tagClient.updateTag({ id, label }).then((res: any) => { refetchTags(); }).catch((err: any) => {
            console.error(err);
        });
    }

    function deleteTag(id: string) {
        const tagClient = new TagConstructor(TAG_SUBPARTITION);
        tagClient.deleteTag(id).then((res: any) => { refetchTags(); }).catch((err: any) => {
            console.error(err);
        });
    }


    return (
        <Container className="my-4">
            <div className='text-center'>
                <MdEditNote size={32} />
                <MdEditNote size={32} />
                <MdEditNote size={32} />
            </div>
            <Routes>
                <Route path="/" element={<NoteList
                    availableTags={userTags}
                    notes={notesWithTags}
                    onUpdateTag={updateTag}
                    onDeleteTag={deleteTag}
                    // notesLoading={isLoading || isFetching} yea we dont need an also for fetching bx the data is already there...
                    notesLoading={isLoading}
                />} />
                <Route path="/new" element={<NewNote
                    onSubmit={onCreateNote}
                    onAddTag={addTag}
                    availableTags={userTags}
                    availableStoreTags={globalStoreItemTags}

                />} />
                <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
                    <Route index element={<Note onDelete={onDeleteNote} />} />
                    <Route path="edit" element={<EditNote
                        onSubmit={onUpdateNote}
                        onAddTag={addTag}
                        availableTags={userTags}
                        availableStoreTags={globalStoreItemTags}
                    />} />
                </Route>
                <Route path="*" element={<>Not Found</>} />
            </Routes>
        </Container>
    );
}

