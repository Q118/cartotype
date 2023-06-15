import { StoreItemView } from "./store/StoreItemView";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// !!! PU here


type CartoModalProps = {
    /** id of store Item */
    itemId: string;
    onHide: any;
    modalHeader: string;
    show: boolean;
}

export function CartoModal(props: CartoModalProps) {

    // const { modalHeader, itemId, onHide}

    function handleDisableBackdrop() {
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
            onShow={() => handleDisableBackdrop()}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.modalHeader}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StoreItemView
                    item_id={props.itemId}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}