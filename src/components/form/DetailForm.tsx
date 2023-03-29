import { FormWrapper } from "./FormWrapper";
import { ResultItem } from '../../types';
import { StoreItem } from "../StoreItem";
// TODO apply styling and themeing throughopu all of the form
// want to have it display the one card in the bottom of the form that is like the preview and it gets updated as you type in the form dynamically

// we gpmma need the selectedCard, ....

type DetailFormData = {
    selectedItem: ResultItem | null;
    inputSearch: string;
    price: number;
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
    return (
        <FormWrapper title="Enter Details for Store">
            <label>Price: </label>
            <div className="mb-3 input-group">
                <span className="input-group-text">$</span>
                <input
                    placeholder="0"
                    required
                    type="number"
                    className="form-control"
                />
                <span className="input-group-text">.</span>
                <input
                    placeholder="00"
                    type="number"
                    className="form-control"
                    style={{
                        maxWidth: '4rem'
                    }}
                />
            </div>
            <label>Official Title: </label>
            <input
                type="text"
                className="form-control"
                placeholder={inputSearch}
                value={storeTitle}
                onChange={e => updateFields({ storeTitle: e.target.value })}
            />
            <h6>Preview:</h6>
            {/* TODO: make the preview be a little smaller */}
            <StoreItem
                name={storeTitle || inputSearch}
                price={price}
                imgUrl={selectedItem?.imgUrl || ''}
                id={selectedItem?.id || ''}
            />
        </FormWrapper>
    )
}