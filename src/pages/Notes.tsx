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

// TODO: chang from devNotes to prodNotes or whatever end up using
// * or potentially using loginSession info for the folder name :)
const NOTE_SUBFOLDER = 'devNotes';


export function Notes() {
    /** notes for the current user session */
    const [ userNotes, setUserNotes ] = useState<RawNote[]>([]);
    const [ tags, setTags ] = useLocalStorage<Tag[]>('TAGS', []);

    // const [storeTags, setStoreTags] = useLocalStorage<StoreItemTag[]>('STORE-TAGS', []);


    const {
        data: notes,
        isLoading,
        error: notesError,
        refetch: refetchNotes,
        isFetching
    }: any = useQuery({
        queryKey: [ `get-all-notes` ],
        queryFn: async () => {
            const allNotes = await NoteConstructor.getAllNotes(NOTE_SUBFOLDER);
            return allNotes;
        },
        enabled: true,
    });


    useEffect(() => {
        // console.log('notes', notes)
        if (notes) setUserNotes(notes);
    }, [ notes ]);

    const notesWithTags = useMemo(() => {
        return userNotes?.map((note: any) => {
            return { ...note, tags: tags.filter(tag => note.tagIds?.includes(tag.id)) }
        })
    }, [ userNotes, tags ]);

    function onCreateNote({ tags, ...data }: NoteData) {
        setUserNotes((prevNotes: any) => {
            return [ ...prevNotes, { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) } ]
        })
    }

    function addTag(tag: Tag) {
        setTags(prev => [ ...prev, tag ]);
        // setStoreTags(prev => [...prev, tag])
    }

    function onUpdateNote(id: string, { tags, ...data }: NoteData) {
        setUserNotes(prevNotes => {
            return prevNotes.map(note => {
                if (note.id !== id) return note;
                return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
            })
        })
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
                    notesLoading={isLoading || isFetching}
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

