import { StoreItem } from "../StoreItem";
// import { FormWrapper } from "./FormWrapper";
import { ResultItem, StorePrice } from '../../types';
import { consolidateStorePrice } from "../../utilities/formatCurrency";


type PreviewConfirmData = {
    selectedItem: ResultItem | null;
    storeTitle: string;
    price: StorePrice;
    editMode?: boolean;
};

type PreviewConfirmProps = PreviewConfirmData & {
    updateFields: (fields: Partial<PreviewConfirmData>) => void
}

export function PreviewConfirm({
    selectedItem,
    storeTitle,
    price,
    updateFields,
    editMode = false,
}: PreviewConfirmProps) {

    return (
        <>
            <div style={{ padding: '10px' }}>
                <h2>Preview Your {editMode ? "Updated" : "New"} Item</h2>
            </div>
            <br />
            <StoreItem
                id={selectedItem?.id || ''}
                name={storeTitle}
                // price={+`${price.dollars}.${price.cents}`}
                price={consolidateStorePrice(price)}
                imgUrl={selectedItem?.imgUrl || ''}
                isPreview={true}
            />
            <br />
            <p>If you're happy with everything, hit <i>finish</i></p>
        </>
    )
}