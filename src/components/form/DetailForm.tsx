import { FormWrapper } from "../../utilities/FormWrapper";
import { ResultItem, StorePrice, RawNote } from '../../types';
import { StoreItem } from "../store/StoreItem";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { consolidateStorePrice } from "../../utilities/formatCurrency";
import { useAdminLayoutContext } from "../AdminLayout";
import { NoteListGroupFormBit } from "./NoteListGroupFormBit";

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

const decouplePrice = (price: number) => {
    const dollars = Math.floor(price);
    const cents = Math.round((price - dollars) * 100);
    return { dollars, cents };
}



export function DetailForm(props: DetailFormProps) {
    const { selectedItem: selectedItemProp, inputSearch, price, storeTitle, updateFields, availableNotes, attachedNoteIds } = props;
    const selected_item = useAdminLayoutContext(); //! itll be null if not from view!
    const local_selectedItem = selected_item || selectedItemProp;
    const local_storeTitle = selected_item ? selected_item.name : storeTitle || inputSearch;
    const local_price = selected_item ? decouplePrice(selected_item.price) : price;
    // console.log(props);

    // TODO:obvs need to dynamically show the ntoes and make them links


    return (
        <FormWrapper title="Edit Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <span className="input-group-text">$</span>
                <input placeholder="0" type="number"
                    className="form-control" required value={local_price.dollars}
                    onChange={e => updateFields({ price: { ...local_price, dollars: +e.target.value } })}
                />
                <span className="input-group-text">.</span>
                {/* //! not required; let them leave it at 0 if they want */}
                <input placeholder="00" type="number"
                    value={local_price.cents} className="form-control"
                    style={{ maxWidth: '4rem' }}
                    onChange={(e) => updateFields({ price: { ...local_price, cents: +e.target.value } })}
                    max={99} min={0}
                />
            </div>
            <label>Official Title: </label>
            <input type="text" className="form-control"
                placeholder={local_storeTitle} value={local_storeTitle}
                maxLength={20} autoFocus
                onChange={e => updateFields({ storeTitle: e.target.value })}
            />
            <label>Associated Notes</label>
            <NoteListGroupFormBit
                availableNotes={availableNotes}
                onAddNote={(id: string) => updateFields({ attachedNoteIds: [...attachedNoteIds, id] })}
                attachedNoteIds={attachedNoteIds}
                selectedItem={local_selectedItem}
            />
            <h6>Preview:</h6>
            <Row>
                <Col style={{ maxWidth: '250px' }}>
                    <StoreItem
                        name={local_storeTitle}
                        price={consolidateStorePrice(local_price)}
                        imgUrl={local_selectedItem?.imgUrl || ''}
                        id={local_selectedItem?.id || ''}
                        isPreview={true}
                    />
                </Col>
            </Row>
        </FormWrapper>
    )
}