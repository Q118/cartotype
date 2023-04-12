// TODO: use a similar approach to the FormApp component to create an EditForm component
// it will allow user to update/delete items in the db

import { useMultistepForm } from '../hooks/useMultistepForm';
import { updateStoreItem } from '../api/dataStore';
import { ResultItem, StorePrice } from '../types';

/* select an item to edit:
display items and select one
next one
edit the properties of the item
last one:
holds preview and confirm and submit
*/

// !! keep goi9ng with this and compare side by side with FormApp to do a siumilar flwo
type EditFormData = {
    selectOptions: ResultItem[];
    selectedItem: ResultItem | null;
    price: StorePrice;
    newTitle: string;
    isDataLoading: boolean;
};

const INITIAL_DATA: EditFormData = {
    selectOptions: [],
    selectedItem: null,
    price: { dollars: 0, cents: 0 },
    newTitle: '',
    isDataLoading: false,
};

export function EditForm() {


    return (
        <>
            EDIT THE LIST
        </>
    )


}