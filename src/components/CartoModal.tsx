/** 
 * agnostic modal component for use in the app
 */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect } from 'react';


type CartoModalProps = {
    /** id of store Item or Note Item, or more... expandable*/
    // itemId: string;
    onHide: any;
    onShow: any;
    show: boolean;
    modalbodycomponent: JSX.Element;
}

export function CartoModal(props: CartoModalProps) {

    const { setModalOpen } = useShoppingCart();

    useEffect(() => {
        // TODO this is hacky.. come back and fix this.. right now its listening for pathname bc that means a note item was clicked to be views. but its not handling case where current pathname note is clicked
        
        setModalOpen(false); // close the modal SO THAT other click events can be handled properly
        props.onHide();
    }, [ window.location.pathname ]);


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
                {props.modalbodycomponent}
            </Modal.Body>
        </Modal>
    )
}