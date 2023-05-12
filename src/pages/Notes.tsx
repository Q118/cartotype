import { useEffect, useMemo, useState } from 'react';
import { NoteData, RawNote, StoreItemTag, Tag } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Container from 'react-bootstrap/Container';
import { Route, Routes } from 'react-router-dom';
import { Note, NewNote, NoteList, NoteLayout, EditNote } from '../components/notes';

import { useQuery } from '@tanstack/react-query';
import { Notes as NoteConstructor } from '../api/lib/notes';
import { MdEditNote } from 'react-icons/md';



// TODO: chang from devNotes to prodNotes or whatever end up using or potentially using loginSession info for the folder name so we seperate the notes per folder/tenant/user
const NOTE_SUBPARTITION = 'dev';


export function Notes() {
    /** notes for the current user session */
    const [ userNotes, setUserNotes ] = useState<RawNote[]>([]);
    const [ tags, setTags ] = useLocalStorage<Tag[]>('TAGS', []);
    // const [storeTags, setStoreTags] = useLocalStorage<StoreItemTag[]>('STORE-TAGS', []);
    // !!!!!!!!!!!!!!!!
    // !! PU in here.. do all the cruding for the notes..and then move on to tags and shiz..

    const {
        data: notes,
        isLoading,
        error: notesError,
        refetch: refetchNotes,
        isFetching
    }: any = useQuery({
        queryKey: [ `get-all-notes` ],
        queryFn: async () => {
            const allNotes = await NoteConstructor.getAllNotes(NOTE_SUBPARTITION);
            return allNotes;
        },
        enabled: true,
    });

    useEffect(() => { if (notes) setUserNotes(notes); }, [ notes ]);

    const notesWithTags = useMemo(() => {
        return userNotes?.map((note: any) => {
            return { ...note, tags: tags.filter(tag => note.tagIds?.includes(tag.id)) }
        })
    }, [ userNotes, tags ]);

    function onCreateNote({ tags, ...data }: NoteData) {
        // post it to the data base
        const noteClient = new NoteConstructor(NOTE_SUBPARTITION);
        let storeItemIds: string[] = [];
        if (data.storeItemTags) storeItemIds = data.storeItemTags.map(storeItemTag => storeItemTag.id);
        delete data.storeItemTags;
        // this is all we need to do bc the effect will update the userNotes
        noteClient.addNote({
            ...data,
            id: uuidv4(),
            storeItemIds: storeItemIds,
            tagIds: tags.map(tag => tag.id)
        }).then((res: any) => { refetchNotes(); }).catch((err: any) => {
            console.error(err);
        });
    }

    function addTag(tag: Tag) {
        setTags(prev => [ ...prev, tag ]);
        // setStoreTags(prev => [...prev, tag])
    }

    function onUpdateNote(id: string, { tags, ...data }: NoteData) {
        const noteClient = new NoteConstructor(NOTE_SUBPARTITION);
        let storeItemIds: string[] = [];
        if (data.storeItemTags) storeItemIds = data.storeItemTags.map(storeItemTag => storeItemTag.id);
        delete data.storeItemTags;
        // this is all we need to do bc the effect will update the userNotes
        noteClient.updateNote({
            ...data, id, storeItemIds,
            markdown: { "rawText": data.markdown }, 
            tagIds: tags.map(tag => tag.id)
        }).then((res: any) => { refetchNotes(); }).catch((err: any) => {
            console.error(err);
        });
    }

    function onDeleteNote(id: string) {
        setUserNotes(prevNotes => {
            return prevNotes.filter(note => note.id !== id)
        })
    }

    function updateTag(id: string, label: string) {
        setTags(prevTags => {
            return prevTags.map(tag => {
                if (tag.id !== id) return tag;
                return { ...tag, label }
            })
        })
    }

    function deleteTag(id: string) {
        setTags(prevTags => {
            return prevTags.filter(tag => tag.id !== id)
        })
    }


    return (
        <Container className="my-4">
            {/* <h4>Notes Page</h4> */}
            {/* <hr /> */}
            <div className='text-center'>
                <MdEditNote size={32} />
                <MdEditNote size={32} />
                <MdEditNote size={32} />
            </div>

            <Routes>
                <Route path="/" element={<NoteList
                    availableTags={tags}
                    notes={notesWithTags}
                    onUpdateTag={updateTag}
                    onDeleteTag={deleteTag}
                    // notesLoading={isLoading || isFetching} yea we dont need an also for fetching bx the data is already there...
                    notesLoading={isLoading}
                />} />
                <Route path="/new" element={<NewNote
                    onSubmit={onCreateNote}
                    onAddTag={addTag}
                    availableTags={tags}
                />} />
                <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
                    <Route index element={<Note onDelete={onDeleteNote} />} />
                    <Route path="edit" element={<EditNote
                        onSubmit={onUpdateNote}
                        onAddTag={addTag}
                        availableTags={tags}
                    />} />
                </Route>
                <Route path="*" element={<>Not Found</>} />
            </Routes>
        </Container>
    );
}

