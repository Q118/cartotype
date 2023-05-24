import { FormWrapper } from "../../utilities/FormWrapper";
import { ResultItem, StorePrice } from '../../types';
import { StoreItem } from "../store/StoreItem";
import { Col, ListGroup, Row } from "react-bootstrap";
import { consolidateStorePrice } from "../../utilities/formatCurrency";
import { useAdminLayoutContext } from "../AdminLayout";



type DetailFormData = {
    selectedItem: ResultItem | null;
    inputSearch?: string;
    price: StorePrice;
    storeTitle: string;
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
    const { selectedItem, inputSearch, price, storeTitle, updateFields } = props;

    const selected_item = useAdminLayoutContext();

    const _selectedItem = selected_item || selectedItem;
    const _storeTitle = selected_item ? selected_item.name : storeTitle || inputSearch;
    const _price = selected_item ? decouplePrice(selected_item.price) : price;

    // console.log(_price);
    // console.log('selectedItem', selectedItem)
    // console.log('selected_item', selected_item)

    // TODO:obvs need to dynamically show the ntoes and make them links
    return (
        <FormWrapper title="Edit Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <span className="input-group-text">$</span>
                <input placeholder="0" type="number"
                    className="form-control" required value={_price.dollars}
                    onChange={e => updateFields({ price: { ..._price, dollars: +e.target.value } })}
                />
                <span className="input-group-text">.</span>
                {/* //! not required; let them leave it at 0 if they want */}
                <input placeholder="00" type="number"
                    value={_price.cents} className="form-control"
                    style={{ maxWidth: '4rem' }}
                    onChange={(e) => updateFields({ price: { ..._price, cents: +e.target.value } })}
                    max={99} min={0}
                />
            </div>
            <label>Official Title: </label>
            <input type="text" className="form-control"
                placeholder={_storeTitle} value={_storeTitle}
                maxLength={20} autoFocus
                onChange={e => updateFields({ storeTitle: e.target.value })}
            />
            <label>Associated Notes</label>
            <ListGroup className="listGroup-associatedNotes">
                <ListGroup.Item className="listItem-associatedNotes">note 1</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes-alt">fmds,mf,.ds</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes">note 2</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes-alt">note dmsadka</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes">ghfjdhdsk</ListGroup.Item>
                <ListGroup.Item className="listItem-associatedNotes-alt">koekrl;ew</ListGroup.Item>

            </ListGroup>
            <h6>Preview:</h6>
            <Row>
                <Col style={{ maxWidth: '250px' }}>
                    <StoreItem
                        name={_storeTitle}
                        price={consolidateStorePrice(_price)}
                        imgUrl={_selectedItem?.imgUrl || ''}
                        id={_selectedItem?.id || ''}
                        isPreview={true}
                    />
                </Col>
            </Row>
        </FormWrapper>
    )
}