import { FormWrapper } from "../../utilities/FormWrapper";
import { ResultItem, StorePrice } from '../../types';
import { StoreItem } from "../store/StoreItem";
import { Col, ListGroup, Row } from "react-bootstrap";
// import { useTheme } from "../../context/ThemeContext";
import { consolidateStorePrice } from "../../utilities/formatCurrency";
// import { FormEvent } from "react";


type DetailFormData = {
    selectedItem: ResultItem | null;
    inputSearch?: string;
    price: StorePrice;
    storeTitle: string;
}

type DetailFormProps = DetailFormData & {
    updateFields: (fields: Partial<DetailFormData>) => void
}

export function DetailForm({
    selectedItem,
    inputSearch,
    price,
    storeTitle,
    updateFields,
}: DetailFormProps) {

    // TODO:obvs need to dynamically show the ntoes and make them links
    return (
        <FormWrapper title="Edit Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <span className="input-group-text">$</span>
                <input placeholder="0" type="number"
                    className="form-control" required value={price.dollars}
                    onChange={e => updateFields({ price: { ...price, dollars: +e.target.value } })}
                />
                <span className="input-group-text">.</span>
                {/* //! not required; let them leave it at 0 if they want */}
                <input placeholder="00" type="number"
                    value={price.cents} className="form-control"
                    style={{ maxWidth: '4rem' }}
                    onChange={(e) => updateFields({ price: { ...price, cents: +e.target.value } })}
                    max={99} min={0}
                />
            </div>
            <label>Official Title: </label>
            <input type="text" className="form-control"
                placeholder={storeTitle} value={storeTitle}
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
                        name={storeTitle || inputSearch}
                        price={consolidateStorePrice(price)}
                        imgUrl={selectedItem?.imgUrl || ''}
                        id={selectedItem?.id || ''}
                        isPreview={true}
                    />
                </Col>
            </Row>
        </FormWrapper>
    )
}