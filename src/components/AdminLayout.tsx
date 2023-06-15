import { Outlet, useOutletContext, useParams, Navigate } from "react-router-dom";
import { SelectedItem } from "../types";


type AdminLayoutProps = {
    items: SelectedItem[];
};


export function AdminLayout({ items }: AdminLayoutProps) {
    const { item_id } = useParams();
    const storeItem = items.find((item: any) => item.id === item_id);
    if (!storeItem) return <Navigate to="/admin" replace />
    // else return outlet to render nested routes
    return <Outlet context={storeItem} /> 
}


export function useAdminLayoutContext() {
    return useOutletContext<SelectedItem>();
}
