/** 
 * overlayed list of notes associated with the store item
*/
import { useRef, useState } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { GiStabbedNote } from 'react-icons/gi';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import Accordian from 'react-bootstrap/Accordion';

type StoreNoteCogProps = {
    storeItem_id: string;
}
// const isEven = (num: number) => num % 2 === 0;
// const isLastItem = (index: number, array: any[]) => index === array.length - 1;

// TODO a link to add a note maybe

export function StoreNoteCog({ storeItem_id }: StoreNoteCogProps) {
    const targetRef = useRef(null);
    const [ showOverlay, setShowOverlay ] = useState(false);
    const { getStoreItemById, availableNotes } = useShoppingCart();

    const getNoteFromAvailableNotes = (id: string) => availableNotes.find(note => note.id === id);

    const returnNoNotes = () => <div className='storeTags-listGroup-card' style={{ padding: '5px', fontStyle: 'italic' }}>
        No notes for this item...<br />Go make some!
    </div>;

    const renderListItems = (id: string) => {
        const storeItem = getStoreItemById(id);
        if (!storeItem.notes) return returnNoNotes();
        const { notes: noteId_list } = storeItem;
        return noteId_list.map((note_id: string, i: number) => {
            const note = getNoteFromAvailableNotes(note_id);
            if (!note) return returnNoNotes();
            return <div key={note_id}>
                <Accordian.Item className="note-accordian-item" id={note_id} eventKey={i + ''}>
                    <Accordian.Header className="note-accordian-header">{note.title}</Accordian.Header>
                    <Accordian.Body>
                        <ReactMarkdown children={note.markdown} remarkPlugins={[ remarkGfm ]} />
                    </Accordian.Body>
                </Accordian.Item>
            </div>
        });
    }

    const renderNoteListTitle = (id: string) => {
        const storeItem = getStoreItemById(id);
        return <h5 className="noteList-title">Notes for {storeItem.name}:</h5>
    }

    const handleIconClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        setShowOverlay(true);
    }

    return (
        <>
            <Overlay target={targetRef.current} show={showOverlay} placement="bottom-end" onHide={() => setShowOverlay(false)}
                rootClose={true}  // this specifies that the overlay will close when the user clicks outside of it
                container={document.getElementById('store-wrapper-div')!}>
                <div className="accordian-notes-container">
                    <Accordian>{renderNoteListTitle(storeItem_id)}{renderListItems(storeItem_id)}</Accordian>
                </div>
            </Overlay>
            {/* The trigger */}
            <button onClick={(e) => handleIconClick(e)} ref={targetRef} className="stabbed-note-btn" title='preview notes on this item'>
                <GiStabbedNote size={35} />
            </button>
        </>
    )
}
