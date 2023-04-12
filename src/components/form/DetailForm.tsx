import { FormWrapper } from "./FormWrapper";
import { ResultItem, StorePrice } from '../../types';
import { StoreItem } from "../StoreItem";
import { Col, Row } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext";
import { FormEvent } from "react";
// // TODO apply styling and themeing throughopu all of the form

type DetailFormData = {
    selectedItem: ResultItem | null;
    inputSearch?: string;
    price: StorePrice;
    storeTitle: string;
    // displayPrice: number | null;
    // imgUrl: string;
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

    const { currentTheme } = useTheme();

    // console.log('price in DetailForm:', price);

    function consolidateStorePrice({ dollars, cents }: StorePrice): number {
        return +(dollars + (cents / 100));
    }



    return (
        <FormWrapper title="Edit Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <span className={`input-group-text bg-${currentTheme === 'dark' ? 'secondary' : 'light'} text-${currentTheme === 'dark' ? 'light' : 'dark'}`}>$</span>
                <input
                    placeholder="0"
                    type="number"
                    id={`input-${currentTheme}`}
                    className="form-control"
                    required
                    value={price.dollars}
                    onChange={e => updateFields({ price: { ...price, dollars: +e.target.value } })}
                />
                <span className={`input-group-text bg-${currentTheme === 'dark' ? 'secondary' : 'light'} text-${currentTheme === 'dark' ? 'light' : 'dark'}`}>.</span>
                <input
                    placeholder="00"
                    type="number"
                    id={`input-${currentTheme}`}
                    value={price.cents}
                    //! not required; let them leave it at 0 if they want
                    className="form-control"
                    style={{ maxWidth: '4rem' }}
                    onChange={(e) => updateFields({price: { ...price, cents: +e.target.value }})}
                    max={99}
                    min={0}
                    // onInput={(e) => setTwoNumberDecimal(e)}
                />
            </div>
            <label>Official Title: </label>
            <input
                type="text"
                className="form-control"
                id={`input-${currentTheme}`}
                placeholder={storeTitle}
                value={storeTitle}
                onChange={e => updateFields({ storeTitle: e.target.value })}
                maxLength={20}
            />
            {/* <span>
            <small>20 character limit</small>
            </span> */}
            <h6>Preview:</h6>
            {/* TODO: make the preview be a little smaller or let user resize */}
            <Row>
                <Col style={{
                    maxWidth: '250px',
                }}>
                    <StoreItem
                        name={storeTitle || inputSearch}
                        // price={+`${price.dollars}.${price.cents}`}
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