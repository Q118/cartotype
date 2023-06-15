import { StoreItemView } from "./store/StoreItemView";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useShoppingCart } from "../context/ShoppingCartContext";
// !!! PU here


type CartoModalProps = {
    /** id of store Item */
    itemId: string;
    onHide: any;
    show: boolean;
}

export function CartoModal(props: CartoModalProps) {

    const { setModalOpen } = useShoppingCart();

    function handleDisableBackdrop() {
        setModalOpen(true);
        console.log("fhdshfj")
        // document.body.removeEventListener 
        // handle disabling the rest of the body temporaryily pr at least disable the click events
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static" // use to force user to click close
            // onShow={() => handleDisableBackdrop()}
            onEntered={() => handleDisableBackdrop()}
            onHide={() => setModalOpen(false)}
        >
            <Modal.Body>
                <Button className="carto-btn top-right-container" onClick={props.onHide}>Close</Button>
                <StoreItemView
                    item_id={props.itemId}
                />
            </Modal.Body>
        </Modal>
    )
}