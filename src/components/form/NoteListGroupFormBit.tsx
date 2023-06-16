import { v4 as uuidv4 } from 'uuid';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { GrNewWindow } from "react-icons/gr";
import { RawNote } from '../../types';
// TODO have it just be pop outs for each ntoe modal.

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

    const isAttached = (id: string): boolean => attachedNoteIds?.includes(id) || false;

    const renderNoteSelection = availableNotes && availableNotes.map((note: RawNote, index: number) => (
        <ListGroup.Item className={`listItem-associatedNotes${isEven(index) ? '-alt' : ''}`} key={uuidv4()}>
            <Form.Check
                type="checkbox"
                checked={isAttached(note.id)}
                id={`switch-note-${note.id}`}
                label={<div style={{
                    ...isAttached(note.id) && { fontWeight: 'bold' }
                }}>{note.title}</div>}
                onChange={() => onAddOrRemoveNote(note.id)}
            />
            <div className="top-right-container">
                <GrNewWindow
                    // TODO figure out why i cant color this
                    style={{ color: 'pink !important' }}
                />
            </div>
        </ListGroup.Item>
    ));



    return (
        <>
            <ListGroup className="listGroup-associatedNotes">
                {renderNoteSelection}
            </ListGroup>
        </>
    )
}