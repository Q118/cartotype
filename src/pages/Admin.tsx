/**
 * Admin page
 * 
 * add items to the database store
 */

import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "../api/axios";




export function Admin() {
    
    const { data, isLoading, error }: any = useQuery({
        queryKey: ['photo-list-request'],
        queryFn: () => getPhotos('sunset'),
    });



    return (
        <>
            <h1>
                Admin Dashboard
            </h1>


            <h3>About</h3>
            <p>A store to buy things</p>
            <p>and markdown supported notes and notetaking for product info</p>
            <small>perhaps the notes are all about the different products and there will then be an option on each produc card; view any related notes for this product made by you [or others]</small>
        </>
    );
}
