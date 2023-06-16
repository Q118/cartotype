import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import remarkGfm from 'remark-gfm';
import { v4 as uuidv4 } from 'uuid';
// import { GrNewWindow } from "react-icons/gr";
import { RawNote } from '../../types';
import { CartoModal } from '../CartoModal';
// import { BsWindowPlus } from "react-icons/bs";
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
                {/* // TODO figure out why i cant color this */}
                <button title='preview note' className='popout-note-btn'>
                    <RxOpenInNewWindow style={{ color: 'pink !important' }}
                        onClick={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setModal_noteId(note.id)
                            setShowLocalModal(true)
                        }} />
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
                itemId={''}
                show={showLocalModal}
                onHide={(e: any) => {
                    e.stopPropagation();
                    setModal_noteId('');
                    setShowLocalModal(false);
                }} // unshowOverlay once modal is opened (cleaner)
                onShow={() => console.log('showing modal')}
                modalBodyComponent={modalBodyComponent(modal_noteId)}
            />
        </>
    )
}