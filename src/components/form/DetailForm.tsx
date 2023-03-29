import { FormWrapper } from "./FormWrapper";
import { ResultItem } from '../../types';
import { StoreItem } from "../StoreItem";
import { StorePrice } from "../../types";
// TODO apply styling and themeing throughopu all of the form



type DetailFormData = {
    selectedItem: ResultItem | null;
    inputSearch: string;
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
    updateFields
}: DetailFormProps) {

    function consolidateStorePrice({ dollars, cents }: StorePrice): number {
        return +(dollars + (cents / 100));
    }

    return (
        <FormWrapper title="Enter Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <span className="input-group-text">$</span>
                <input
                    placeholder="0"
                    type="number"
                    className="form-control"
                    required
                    onChange={e => updateFields({ price: { ...price, dollars: +e.target.value } })}
                />
                <span className="input-group-text">.</span>
                <input
                    placeholder="00"
                    type="number"
                    // not required; let them leave it at 0 if they want
                    className="form-control"
                    style={{
                        maxWidth: '4rem'
                    }}
                    onChange={e => updateFields({ price: { ...price, cents: +e.target.value } })}
                />
            </div>
            <label>Official Title: </label>
            <input
                type="text"
                //? not require this one but maybe we should...
                // required
                className="form-control"
                placeholder={inputSearch}
                value={storeTitle}
                onChange={e => updateFields({ storeTitle: e.target.value })}
            />
            <h6>Preview:</h6>
            {/* TODO: make the preview be a little smaller or let user resize */}
            <StoreItem
                name={storeTitle || inputSearch}
                price={consolidateStorePrice(price)}
                imgUrl={selectedItem?.imgUrl || ''}
                id={selectedItem?.id || ''}
            />
        </FormWrapper>
    )
}