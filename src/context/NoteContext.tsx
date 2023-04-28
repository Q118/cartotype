import { useContext, createContext, ReactNode, useMemo } from 'react';
import { Note, NoteData, RawNote, RawNotedata, Tag } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
type NoteProviderProps = {
    children: ReactNode;
};
import { v4 as uuidv4 } from 'uuid';


type NoteContext = {
    notes: RawNote[];
    setNotes: (notes: RawNote[]) => void;
    tags: Tag[];
    setTags: (tags: Tag[]) => void;
    notesWithTags: Note[];
    onCreateNote: (data: NoteData) => void;
    addTag: (tag: Tag) => void;
};

const NoteContext = createContext({} as NoteContext);

export function useNoteContext() {
    return useContext(NoteContext);
}

export function NoteContextProvider({ children }: NoteProviderProps) {
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
        <NoteContext.Provider value={{
            notes,
            setNotes,
            tags,
            setTags,
            notesWithTags,
            onCreateNote,
            addTag
        }}>
            {children}
        </NoteContext.Provider>
    );
}