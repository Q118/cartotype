import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Container from 'react-bootstrap/Container';
import { NoteData, RawNote, StoreItemTag, Tag } from '../types';
// import { useLocalStorage } from '../hooks/useLocalStorage';
import { Note, NewNote, NoteList, NoteLayout, EditNote } from '../components/notes';
import { Notes as NoteConstructor } from '../api/lib/notes';
import { MdEditNote } from 'react-icons/md';
import { Tags as TagConstructor } from '../api/lib/tags';
// TODO; displayyyy teh storeItemTagss


// TODO: change from devNotes to prodNotes or whatever end up using or potentially using loginSession info for the folder name so we seperate the notes per folder/tenant/user
const NOTE_SUBPARTITION = 'dev';
const TAG_SUBPARTITION = 'dev';
// TODO modulate this into a hook??? that can be used by tags or notes or whatever.. but really TODO modulate this....
//!! look how im doing the same thing for tags and for notes... (hook>)

export function Notes() {
    /** notes and tags for the current user session */
    const [ userNotes, setUserNotes ] = useState<RawNote[]>([]);
    const [ userTags, setUserTags ] = useState<Tag[]>([]);
    // const [ tags, setTags ] = useLocalStorage<Tag[]>('TAGS', []);

    // const [storeTags, setStoreTags] = useLocalStorage<StoreItemTag[]>('STORE-TAGS', []);
    // !!!!!!!!!!!!!!!!
    // !! PU in here..then move on to tags and shiz..

    const { data: notes, isLoading, error: notesError, refetch: refetchNotes, isFetching }: any = useQuery({
        queryKey: [ `get-all-notes` ],
        queryFn: async () => {
            const allNotes = await NoteConstructor.getAllNotes(NOTE_SUBPARTITION);
            return allNotes;
        },
        enabled: true,
    });

    const { data: tags, isLoading: tagsLoading, error: tagsError, refetch: refetchTags, isFetching: isTagFetching }: any = useQuery({
        queryKey: [ `get-all-tags` ],
        queryFn: async () => {
            const allTags = await TagConstructor.getAllTags(TAG_SUBPARTITION);
            return allTags;
        },
        enabled: true,
    });

    useEffect(() => { if (notes) setUserNotes(notes); }, [ notes ]);
    useEffect(() => { if (tags) setUserTags(tags); }, [ tags ]);

    const notesWithTags = useMemo(() => {
        return userNotes?.map((note: any) => {
            return { ...note, tags: userTags.filter(tag => note.tagIds?.includes(tag.id)) }
        })
    }, [ userNotes, userTags ]);

    const handleStoreItemTags = (storeItemTags: StoreItemTag[]) => storeItemTags.map(tag => tag.id);

    function onCreateNote({ tags, ...data }: NoteData) {
        // post it to the data base
        const noteClient = new NoteConstructor(NOTE_SUBPARTITION);
        let storeItemIds: string[] = [];
        if (data.storeItemTags) storeItemIds = handleStoreItemTags(data.storeItemTags);
        delete data.storeItemTags;
        // this is all we need to do bc the effect will update the userNotes
        noteClient.addNote({
            ...data, id: uuidv4(),
            markdown: { "rawText": data.markdown },
            storeItemIds, tagIds: tags.map(tag => tag.id)
        }).then((res: any) => { refetchNotes(); }).catch((err: any) => {
            console.error(err);
        });
    }

    function onUpdateNote(id: string, { tags, ...data }: NoteData) {
        const noteClient = new NoteConstructor(NOTE_SUBPARTITION);
        let storeItemIds: string[] = [];
        if (data.storeItemTags) storeItemIds = handleStoreItemTags(data.storeItemTags);
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
        // TODO set alert to confirm delete
        let userConfirm = window.confirm('Are you sure you want to delete this note?');
        if (!userConfirm) return;
        const noteClient = new NoteConstructor(NOTE_SUBPARTITION);
        noteClient.deleteNote(id).then((res: any) => { refetchNotes(); }).catch((err: any) => {
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
        setUserTags(prevTags => {
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
                />} />
                <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
                    <Route index element={<Note onDelete={onDeleteNote} />} />
                    <Route path="edit" element={<EditNote
                        onSubmit={onUpdateNote}
                        onAddTag={addTag}
                        availableTags={userTags}
                    />} />
                </Route>
                <Route path="*" element={<>Not Found</>} />
            </Routes>
        </Container>
    );
}

