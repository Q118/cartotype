import { useMemo } from 'react';
import { NoteData, RawNote, RawNotedata, Tag } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Container from 'react-bootstrap/Container';
import { Route, Routes } from 'react-router-dom';
import { Note, NewNote, NoteList, NoteLayout } from '../components/notes';


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
            {/* <h4>Notes Page</h4> */}
            {/* <hr /> */}


            <Routes>
                <Route path="/" element={<NoteList availableTags={tags} notes={notesWithTags} />} />
                <Route path="/new" element={<NewNote
                    onSubmit={onCreateNote}
                    onAddTag={addTag}
                    availableTags={tags}
                />} />
                <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
                    <Route index element={<Note />} />
                    <Route path="edit" element={<>Edit</>} />
                </Route>
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
                <Route path="*" element={<>Not Found</>} />
                {/* </Route> */}

            </Routes>

        </Container>
    );
}

