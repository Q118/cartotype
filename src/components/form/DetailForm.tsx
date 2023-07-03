import { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import { FormWrapper } from "../../utilities/FormWrapper";
import { ResultItem, RawNote } from '../../types';
import { StoreItem } from "../store/StoreItem";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAdminLayoutContext } from "../AdminLayout";
import { NoteListGroupFormBit } from "./NoteListGroupFormBit";

type DetailFormData = {
    selectedItem: ResultItem | null;
    inputSearch?: string;
    price: number;
    storeTitle: string;
    availableNotes: RawNote[];
    attachedNoteIds: string[];
}

type DetailFormProps = DetailFormData & {
    updateFields: (fields: Partial<DetailFormData>) => void
}

export function DetailForm(props: DetailFormProps) {
    const { selectedItem: selectedItemProp, inputSearch, price, storeTitle, updateFields, availableNotes, attachedNoteIds } = props;
    const selected_item = useAdminLayoutContext(); //! itll be null if not from view!.. it just uses params to get it..
    const [ local_selectedItem, setLocal_selectedItem ] = useState<any>(selected_item || selectedItemProp);

    useEffect(() => {
        if (selected_item) setLocal_selectedItem(selected_item);
    }, [])

    useEffect(() => {
        console.log('change to local_selectedItem in effect', local_selectedItem);
        if (local_selectedItem) {
            updateFields({
                selectedItem: local_selectedItem,
                price: +local_selectedItem.price,
                storeTitle: local_selectedItem.name,
                attachedNoteIds: local_selectedItem.notes || [],
            })
        }
    }, [ JSON.stringify(local_selectedItem) ]);

    const handleAddOrRemoveNote = (id: string) => {
        setLocal_selectedItem({
            ...local_selectedItem,
            // if the note is already attached, remove it, otherwise spread and add it to the arr if its not null, or just add the id if its null.
            notes: local_selectedItem.notes?.includes(id) ?
                local_selectedItem.notes.filter((noteId: string) => noteId !== id) : local_selectedItem.notes ? [ ...local_selectedItem.notes, id ] : [ id ]
        })
    }

    return (
        <FormWrapper title="Edit Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <CurrencyInput prefix="$" placeholder="0.00"
                    id="price-input" name="price-input"
                    defaultValue={local_selectedItem.price} decimalsLimit={2}
                    onValueChange={(value, name) => updateFields({ price: +value! })} />
            </div>
            <label>Official Title: </label>
            <input type="text" className="form-control"
                placeholder={local_selectedItem.name || storeTitle || inputSearch}
                value={local_selectedItem.name} maxLength={20} autoFocus
                onChange={e => setLocal_selectedItem({ ...local_selectedItem, name: e.target.value })} />
            <label>Associated Notes</label>
            <NoteListGroupFormBit onAddOrRemoveNote={handleAddOrRemoveNote}
                availableNotes={availableNotes} attachedNoteIds={local_selectedItem.notes} />
            <label>Preview:</label>
            <Row><Col style={{ maxWidth: '250px' }}>
                <StoreItem name={local_selectedItem.name || inputSearch}
                    price={local_selectedItem.price} imgUrl={local_selectedItem.imgUrl}
                    id={local_selectedItem.id} isPreview={true}
                    creditorDisplayName={local_selectedItem.creditorDisplayName}
                />
            </Col></Row>
        </FormWrapper>
    )
}