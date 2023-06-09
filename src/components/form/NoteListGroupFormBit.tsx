import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import remarkGfm from 'remark-gfm';
import { v4 as uuidv4 } from 'uuid';
import { RawNote } from '../../types';
import { CartoModal } from '../CartoModal';
import { RxOpenInNewWindow } from 'react-icons/rx';
// TODO and adjust style of links in the storeItemView



type NoteListGroupFormBitProps = {
    onAddOrRemoveNote: (id: string) => void;
    availableNotes: RawNote[];
    attachedNoteIds: string[];
    // ? tags
};

const isEven = (num: number) => num % 2 === 0;

export function NoteListGroupFormBit({
    availableNotes,
    onAddOrRemoveNote,
    attachedNoteIds = []
}: NoteListGroupFormBitProps): JSX.Element {
    const [ showLocalModal, setShowLocalModal ] = useState(false);
    const [ modal_noteId, setModal_noteId ] = useState<string>('');

    const isAttached = (id: string): boolean => attachedNoteIds?.includes(id) || false;

    const renderNoteSelection = availableNotes && availableNotes.map((note: RawNote, index: number) => (
        <ListGroup.Item className={`listItem-associatedNotes${isEven(index) ? '-alt' : ''}`} key={uuidv4()}>
            <Form.Check onChange={() => onAddOrRemoveNote(note.id)}
                type="checkbox" checked={isAttached(note.id)} id={`switch-note-${note.id}`}
                label={<div style={{ ...isAttached(note.id) && { fontWeight: 'bold' } }}>{note.title}</div>}
            />
            <div className="top-right-container">
                <button title='preview note' className='popout-note-btn'
                    onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setModal_noteId(note.id)
                        setShowLocalModal(true)
                    }}>
                    <RxOpenInNewWindow />
                </button>
            </div>
        </ListGroup.Item>
    ));



    const modalBodyComponent = (note_id: string) => {
        const note = availableNotes.find(note => note.id === note_id);
        if (!note) return <></>;
        return (
            <div id={`popover-note-${note.id}`} style={{
                border: '1px dotted var(--accent)',
                padding: '1rem',
                margin: '2rem',
                backgroundColor: 'var(--body-background)',
                borderRadius: '10px',
            }}>
                <ReactMarkdown children={note.markdown} remarkPlugins={[ remarkGfm ]} />
            </div>
        )
    };


    return (
        <>
            <ListGroup className="listGroup-associatedNotes">{renderNoteSelection}</ListGroup>
            <CartoModal
                show={showLocalModal}
                onHide={(e: any = null) => {
                    if (e) e.stopPropagation();
                    setModal_noteId('');
                    setShowLocalModal(false);
                }} // unshowOverlay once modal is opened (cleaner)
                onShow={() => console.log('showing modal')}
                modalbodycomponent={modalBodyComponent(modal_noteId)}
            />
        </>
    )
}