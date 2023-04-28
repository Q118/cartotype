import { useMemo } from 'react';
import { Note, NoteData, RawNote, RawNotedata, Tag } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Container from 'react-bootstrap/Container';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { NewNote } from '../components/notes/NewNote';

export function Notes() {
    const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
    const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);


    const notesWithTags = useMemo(() => {
        return notes.map(note => {
            return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
        })
    }, [notes, tags]);

    function onCreateNote({ tags, ...data }: NoteData) {
        setNotes(prevNotes => {
            return [...prevNotes, { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) }]
        })
    }

    function addTag(tag: Tag) {
        setTags(prev => [...prev, tag])
    }


    return (
        <Container className="my-4">
            <h4>Notes Page</h4>
            <hr />
            <Link to="new">New Note</Link>


            <Routes>
                <Route path="/">
                    <Route path="new" element={<NewNote
                        onSubmit={onCreateNote}
                        onAddTag={addTag}
                        availableTags={tags}
                    />} />
                    <Route path=":note_id">
                        <Route index element={<>Show</>} />
                        <Route path="edit" element={<>Edit</>} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                    {/* <Route path="*" element={<>Not Found</>} /> */}
                </Route>

            </Routes>

        </Container>
    );
}

