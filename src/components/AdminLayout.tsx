// import { Note } from "../types";
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note, ResultItem, RawNote } from "../types";
// import { useShoppingCart } from "../context/ShoppingCartContext";
// description
// downloadLocation
// displayName
/** selected item to edit */
type SelectedItem = {
    created_at: string;
    id: string;
    imgUrl: string;
    name: string;
    notes: Note[] | null | RawNote[];
    price: number;
} & ResultItem;

// type NoteLayoutProps = {
//     notes: Note[];
// }

type AdminLayoutProps = {
    items: SelectedItem[];
};


export function AdminLayout({ items }: AdminLayoutProps) {

    // const { globalStoreItems, refreshStoreItems, isStoreItemsLoading } = useShoppingCart();

    const { item_id } = useParams();
    // const note = notes.find(note => note.id === id);
    // const note = {};
    // use replace so back button doesn't go back here
    // if (!note) return <Navigate to="/" replace />
    // const item = {};
    const storeItem = items.find((item: any) => item.id === item_id);

    // else return outlet to render nested routes
    return <Outlet context={storeItem} /> // set note in context so each child route can access it with useNote() belwow
}


export function useAdminLayoutContext() {
    return useOutletContext<SelectedItem>();
}
