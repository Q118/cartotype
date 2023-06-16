/** 
 * agnostic modal component for use in the app
 */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useShoppingCart } from "../context/ShoppingCartContext";


type CartoModalProps = {
    /** id of store Item or Note Item, or more... expandable*/
    itemId: string;
    onHide: any;
    onShow: any;
    show: boolean;
    modalBodyComponent: JSX.Element;
}

export function CartoModal(props: CartoModalProps) {

    const { setModalOpen } = useShoppingCart();


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static" // use to force user to click close
            // onShow={() => handleDisableBackdrop()}
            onShow={() => props.onShow()}
            onEntered={() => setModalOpen(true)}
            onHide={() => setModalOpen(false)}
        >
            <Modal.Body>
                <Button className="carto-btn top-right-container" onClick={props.onHide}>Close</Button>
                {props.modalBodyComponent}
            </Modal.Body>
        </Modal>
    )
}