import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note, ResultItem, RawNote, SelectedItem } from "../types";




// type NoteLayoutProps = {
//     availableNotes: Note[];
// }

type AdminLayoutProps = {
    items: SelectedItem[];
    // availableNotes: RawNote[];
};



// const TAG_SUBPARTITION = 'dev';

export function AdminLayout({ items }: AdminLayoutProps) {

    const { item_id } = useParams();


    const storeItem = items.find((item: any) => item.id === item_id);
    // if (!storeItem) return <Navigate to="/" replace />
    // storeItem.availableNotes = notes;


    // else return outlet to render nested routes
    return <Outlet context={storeItem} /> // set note in context so each child route can access it with useNote() belwow
}


export function useAdminLayoutContext() {
    return useOutletContext<SelectedItem>();
}
