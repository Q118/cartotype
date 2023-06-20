/** 
 * overlayed list of notes associated with the store item
*/
import { MouseEvent, useRef, useState, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import ListGroup from 'react-bootstrap/ListGroup';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { GiStabbedNote } from 'react-icons/gi';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import Accordian from 'react-bootstrap/Accordion';

type StoreNoteCogProps = {
    storeItem_id: string;
}

const isEven = (num: number) => num % 2 === 0;

export function StoreNoteCog({ storeItem_id }: StoreNoteCogProps) {
    const targetRef = useRef(null);
    // const [ showLocalModal, setShowLocalModal ] = useState(false);
    // const [ modal_noteId, setModal_noteId ] = useState<string>('');
    const [ showOverlay, setShowOverlay ] = useState(false);
    const { getStoreItemById, availableNotes } = useShoppingCart();

    const getNoteFromAvailableNotes = (id: string) => availableNotes.find(note => note.id === id);

    function handleOutsideClick(e: MouseEvent): void {
        const mouseLocation = e.target;
        // if it's not in the overlay or inside a card, then close it
        if (mouseLocation !== targetRef.current) setShowOverlay(false);
        return;
    }





    const renderListItems = (id: string) => {
        const storeItem = getStoreItemById(id);
        // console.log('inside renderListItems', storeItem);
        const { notes: noteId_list } = storeItem;
        if (!noteId_list) return <ListGroup.Item className="storeTags-listGroup-card-list-item">0</ListGroup.Item>;

        return noteId_list.map((note_id: string, i: number) => {
            const note = getNoteFromAvailableNotes(note_id);
            console.log('inside renderListItems', note);

            if (!note) return <ListGroup.Item className="storeTags-listGroup-card-list-item">0</ListGroup.Item>;
            return (
                <div>
                    <Accordian.Item key={note_id}
                        className="note-accordian-item"
                        // className={`note-accordian-item ${isEven(+i) ? 'alt-listItem' : ''}`}
                        id={note_id} eventKey={i + ''}>
                        <Accordian.Header className='note-accordian-header'>
                            {note.title}
                        </Accordian.Header>
                        <Accordian.Body>
                            <ReactMarkdown children={note.markdown} remarkPlugins={[ remarkGfm ]} />
                        </Accordian.Body>
                    </Accordian.Item>
                </div>
            )
        });
    }

    return (
        <>
            <Overlay target={targetRef.current} show={showOverlay} placement="bottom-end"
                rootClose={true}  // this specifies that the overlay will close when the user clicks outside of it
                onHide={() => setShowOverlay(false)}
                container={document.getElementById('store-wrapper-div')!}
            >
                <div className="accordian-notes-container">
                    <Accordian>
                        {renderListItems(storeItem_id)}
                    </Accordian>
                </div>
            </Overlay>
            {/* The trigger */}
            <button onClick={() => setShowOverlay(true)} ref={targetRef}
                className="stabbed-note-btn" title='view notes on this item'>
                <GiStabbedNote size={35} />
            </button>
        </>
    )
}
