import { useState, useEffect } from "react";
import { FormWrapper } from "../../utilities/FormWrapper";
import { ResultItem, RawNote } from '../../types';
import { StoreItem } from "../store/StoreItem";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { consolidateStorePrice } from "../../utilities/formatCurrency";
import { useAdminLayoutContext } from "../AdminLayout";
import { NoteListGroupFormBit } from "./NoteListGroupFormBit";
// import { decouplePrice } from "../../utilities/formatCurrency";


import CurrencyInput from "react-currency-input-field";

type DetailFormData = {
    selectedItem: ResultItem | null;
    inputSearch?: string;
    // price: StorePrice;
    price: number;
    storeTitle: string;
    availableNotes: RawNote[];
    attachedNoteIds: string[];
}

type DetailFormProps = DetailFormData & {
    updateFields: (fields: Partial<DetailFormData>) => void
}


// we need state and effect here

export function DetailForm(props: DetailFormProps) {
    const { selectedItem: selectedItemProp, inputSearch, price, storeTitle, updateFields, availableNotes, attachedNoteIds } = props;
    const selected_item = useAdminLayoutContext(); //! itll be null if not from view!

    // const [ cameFromView, setCameFromView ] = useState(selected_item ? true : false);
    const [ local_selectedItem, setLocal_selectedItem ] = useState<any>(selected_item || selectedItemProp);


    useEffect(() => {
        // console.log('change to data in effect')
        if (selected_item) {
            setLocal_selectedItem(selected_item);
        }
    }, [])

    useEffect(() => {
        // console.log('change to local_selectedItem in effect', local_selectedItem);
        if (local_selectedItem) {
            updateFields({
                selectedItem: local_selectedItem,
                // price: decouplePrice(+local_selectedItem.price!) || { dollars: 0, cents: 0 },
                price: +local_selectedItem.price,
                storeTitle: local_selectedItem.name,
                attachedNoteIds: local_selectedItem.notes || [],
                // attachedNoteIds: JSON.parse(local_selectedItem.notes) || [],
            })
        }
    }, [ JSON.stringify(local_selectedItem) ]);

    // console.log(props);
    // console.log("selected_item", selected_item);
    // TODO:obvs need to dynamically show the ntoes and make them links
    //  ! PU here .. everythings a mess since ive tried to make it work with the view page
    // !! damn price is all fucked up bc one its a number and thje other its an object with number valies... so maybe change it all up but for now just put it actual nuimbers so i can first solve this issue and then can do that


    return (
        <FormWrapper title="Edit Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <CurrencyInput
                    id="price-input"
                    name="price-input"
                    // placeholder="$0.00"
                    prefix="$"
                    placeholder="Please enter a number"
                    // defaultValue={1000}
                    // defaultValue={consolidateStorePrice(price)}
                    defaultValue={local_selectedItem.price}
                    decimalsLimit={2}
                    // onValueChange={(value, name) => console.log(value, name)}
                    onValueChange={(value, name) => updateFields({ price: +value! })}
                />
                {/* // TODO: little drop down to the right of input to selet type of currency */}
            </div>
            <label>Official Title: </label>
            <input type="text" className="form-control"
                placeholder={selected_item ? selected_item.name : storeTitle || inputSearch}
                value={local_selectedItem.name}
                maxLength={20} autoFocus
                onChange={e => setLocal_selectedItem({ ...local_selectedItem, name: e.target.value })}
            />
            <label>Associated Notes</label>
            <NoteListGroupFormBit
                availableNotes={availableNotes}
                onAddOrRemoveNote={(id: string) => {
                    setLocal_selectedItem({
                        ...local_selectedItem,
                        // V if the note is already attached, remove it, 
                        // otherwise spread and add it to the arr if its not null, or just add the id if its null.
                        notes: local_selectedItem.notes?.includes(id) ?
                            local_selectedItem.notes.filter((noteId: string) => noteId !== id)
                            : local_selectedItem.notes ? [ ...local_selectedItem.notes, id ] : [ id ]
                    })
                }}
                attachedNoteIds={local_selectedItem.notes}
                selectedItem={local_selectedItem}
            />
            <h6>Preview:</h6>
            <Row>
                <Col style={{ maxWidth: '250px' }}>
                    <StoreItem
                        name={local_selectedItem.name || inputSearch}
                        price={3.22}
                        imgUrl={local_selectedItem.imgUrl}
                        id={local_selectedItem.id}
                        isPreview={true}
                    />
                </Col>
            </Row>
        </FormWrapper>
    )
}