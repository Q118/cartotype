import { StoreItem } from "../store/StoreItem";
// import { FormWrapper } from "./FormWrapper";
import { ResultItem, StorePrice } from '../../types';
import { consolidateStorePrice } from "../../utilities/formatCurrency";
import { useAdminLayoutContext } from "../AdminLayout";


type PreviewConfirmData = {
    selectedItem: ResultItem | null;
    storeTitle: string;
    // price: StorePrice;
    price: number;
    editMode?: boolean;
};

type PreviewConfirmProps = PreviewConfirmData & {
    updateFields: (fields: Partial<PreviewConfirmData>) => void
}

export function PreviewConfirm({
    selectedItem: selectedItemProp,
    storeTitle,
    price,
    editMode = false,
}: PreviewConfirmProps) {

    const selected_item = useAdminLayoutContext(); // itll be null if not from view!

    return (
        <>
            <div style={{ padding: '10px' }}>
                <h2>Preview Your {editMode ? "Updated" : "New"} Item</h2>
            </div>
            <br />
            <StoreItem
                id={selected_item ? selected_item.id : selectedItemProp!.id}
                name={selected_item ? selected_item.name : storeTitle}
                price={selected_item ? selected_item.price : price}
                imgUrl={selected_item ? selected_item.imgUrl : selectedItemProp!.imgUrl}
                isPreview={true}
            />
            <br />
            <p>If you're happy with everything, hit <i>finish</i></p>
        </>
    )
}