import { useState, useEffect } from "react";


import { FormWrapper } from "../../utilities/FormWrapper";
import { ResultItem, StorePrice, RawNote, SelectedItem } from '../../types';
import { StoreItem } from "../store/StoreItem";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { consolidateStorePrice } from "../../utilities/formatCurrency";
import { useAdminLayoutContext } from "../AdminLayout";
import { NoteListGroupFormBit } from "./NoteListGroupFormBit";
import { decouplePrice } from "../../utilities/formatCurrency";


type DetailFormData = {
    selectedItem: ResultItem | null;
    inputSearch?: string;
    price: StorePrice;
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

    const [ cameFromView, setCameFromView ] = useState(selected_item ? true : false);
    const [ local_selectedItem, setLocal_selectedItem ] = useState<any>(selected_item || selectedItemProp);


    useEffect(() => {
        console.log('change to data in effect')
        if (selected_item) {
            setLocal_selectedItem(selected_item);
        }
    }, [])

    useEffect(() => {
        console.log('change to local_selectedItem in effect', local_selectedItem);
        if (local_selectedItem) {
            updateFields({
                selectedItem: local_selectedItem,
                price: decouplePrice(+local_selectedItem.price!) || { dollars: 0, cents: 0 },
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
    // okay it works from eeditForm.. now from view/.... both work exceptfor adding new notes to an item
    // NOTES ARE still not working... from edit or view//fdfhjkashk
    // !!! DOOOD ... youre notes logic is messing with youy.... its an array of strings.


    return (
        <FormWrapper title="Edit Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <span className="input-group-text">$</span>
                <input placeholder="0" type="number"
                    className="form-control" required
                    // value={price.dollars}
                    // value={+local_selectedItem.price!.dollars}
                    // onChange={e => updateFields({ price: { ...price, dollars: +e.target.value } })}
                    // onChange={e => setLocal_selectedItem({ ...local_selectedItem, price: { dollars: +e.target.value, cents: +local_selectedItem.price!.cents } })}
                    value={3}
                    onChange={e => setLocal_selectedItem({ ...local_selectedItem, price: { dollars: 3, cents: 22 } })}
                />
                <span className="input-group-text">.</span>
                <input placeholder="00" type="number"
                    // value={price.cents}
                    // value={+local_selectedItem.price!.cents}
                    className="form-control" style={{ maxWidth: '4rem' }}
                    // onChange={(e) => updateFields({ price: { ...price, cents: +e.target.value } })}
                    // onChange={(e) => updateFields({ price: { ...price, cents: +e.target.value } })}
                    // onChange={e => setLocal_selectedItem({ ...local_selectedItem, price: { dollars: +local_selectedItem.price!.dollars, cents: +e.target.value } })}
                    value={22}
                    onChange={e => setLocal_selectedItem({ ...local_selectedItem, price: { dollars: 3, cents: 22 } })}
                    max={99} min={0}
                />
            </div>
            <label>Official Title: </label>
            <input type="text" className="form-control"
                placeholder={selected_item ? selected_item.name : storeTitle || inputSearch}
                // value={selected_item ? selected_item.name : storeTitle || inputSearch}
                // value={selected_item ? selected_item.name : storeTitle || inputSearch}
                value={local_selectedItem.name}
                maxLength={20} autoFocus
                // onChange={e => updateFields({ storeTitle: e.target.value })}
                onChange={e => setLocal_selectedItem({ ...local_selectedItem, name: e.target.value })}
            />
            <label>Associated Notes</label>
            <NoteListGroupFormBit
                availableNotes={availableNotes}
                onAddOrRemoveNote={(id: string) => {
                    // if (attachedNoteIds && attachedNoteIds.includes(id)) {
                    //     updateFields({ attachedNoteIds: attachedNoteIds.filter(noteId => noteId !== id) })
                    //     return;
                    // } // add it if it's not there
                    // updateFields({ attachedNoteIds: [ ...attachedNoteIds, id ] })
                    setLocal_selectedItem({
                        ...local_selectedItem,
                        // below says if the note is already attached, remove it, otherwise add it
                        notes: local_selectedItem.notes?.includes(id) ?
                            local_selectedItem.notes.filter((noteId: string) => noteId !== id)
                            : local_selectedItem.notes ? [ ...local_selectedItem.notes, id ] : [ id ]
                    })
                }}
                attachedNoteIds={local_selectedItem.notes}
                // attachedNoteIds={local_selectedItem.notes}
                // attachedNoteIds={selected_item && selected_item.notes ? selected_item.notes : attachedNoteIds}
                // attachedNoteIds={local_selectedItem}
                // selectedItem={local_selectedItem}
                selectedItem={local_selectedItem}
            />
            <h6>Preview:</h6>
            <Row>
                <Col style={{ maxWidth: '250px' }}>
                    <StoreItem
                        name={local_selectedItem.name || inputSearch}
                        // price={selected_item ? selected_item.price : consolidateStorePrice(price)}
                        // price={consolidateStorePrice(local_selectedItem.price)}
                        price={3.22}
                        // imgUrl={selected_item ? selected_item.imgUrl : selectedItemProp?.imgUrl || ''}
                        imgUrl={local_selectedItem.imgUrl}
                        // id={selected_item ? selected_item.id : selectedItemProp?.id || ''}
                        id={local_selectedItem.id}
                        isPreview={true}
                    />
                </Col>
            </Row>
        </FormWrapper>
    )
}