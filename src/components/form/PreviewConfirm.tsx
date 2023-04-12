import { StoreItem } from "../StoreItem";
// import { FormWrapper } from "./FormWrapper";
import { ResultItem, StorePrice } from '../../types';
import { consolidateStorePrice } from "../../utilities/formatCurrency";


type PreviewConfirmData = {
    selectedItem: ResultItem | null;
    storeTitle: string;
    price: StorePrice;
};

type PreviewConfirmProps = PreviewConfirmData & {
    updateFields: (fields: Partial<PreviewConfirmData>) => void
}

export function PreviewConfirm({
    selectedItem,
    storeTitle,
    price,
    updateFields,
}: PreviewConfirmProps) {

    return (
        <>
            <div style={{ padding: '10px' }}>
                <h2>Preview Your Updated Item</h2>
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
        </>
    )
}