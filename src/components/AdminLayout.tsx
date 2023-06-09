// import { Note } from "../types";
import { useEffect } from "react";
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note, ResultItem, RawNote } from "../types";
import { useQuery } from '@tanstack/react-query';
import { Notes as NoteConstructor } from '../api/lib/notes';



/** selected item to edit */
type SelectedItem = {
    created_at: string;
    id: string;
    imgUrl: string;
    name: string;
    notes: Note[] | null | RawNote[];
    price: number;
    /** available notes to be attached */
    availableNotes?: RawNote[];
} & ResultItem;

// type NoteLayoutProps = {
//     availableNotes: Note[];
// }

type AdminLayoutProps = {
    items: SelectedItem[];
    // availableNotes: RawNote[];
};


// TODO[future]: change from devNotes to prodNotes or whatever end up using or potentially using loginSession info for the folder name so we seperate the notes per folder/tenant/user
const NOTE_SUBPARTITION = 'dev';
// const TAG_SUBPARTITION = 'dev';

export function AdminLayout({ items }: AdminLayoutProps) {

    // const { globalStoreItems, refreshStoreItems, isStoreItemsLoading } = useShoppingCart();

    const { item_id } = useParams();

    const { data: notes, isLoading, error: notesError, refetch: refetchNotes, isFetching }: any = useQuery({
        queryKey: [ `get-all-notes` ],
        queryFn: async () => await NoteConstructor.getAllNotes(NOTE_SUBPARTITION),
        enabled: true,
    }); // TODO fiure outif there is a way to not need this query here and either have notes passed in or just have it be a global thing or a way to use qhats in the query queue already with the key of get-all-notes

    // useEffect(() => { if (notes) setUserNotes(notes); }, [ notes ]);
    // const note = notes.find(note => note.id === id);
    // const note = {};
    // use replace so back button doesn't go back here
    // if (!note) return <Navigate to="/" replace />
    // const item = {};
    const storeItem = items.find((item: any) => item.id === item_id);
    if (!storeItem) return <Navigate to="/" replace />
    storeItem.availableNotes = notes;
    

    // else return outlet to render nested routes
    return <Outlet context={storeItem} /> // set note in context so each child route can access it with useNote() belwow
}


export function useAdminLayoutContext() {
    return useOutletContext<SelectedItem>();
}
