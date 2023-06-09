import { v4 as uuidv4 } from 'uuid';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { RawNote, RawNotedata } from '../../types';

type NoteListGroupFormBitProps = {
    onAddNote: (id: string) => void;
    availableNotes: RawNote[];
    attachedNoteIds: string[];
    // ? tags
};

const isEven = (num: number) => num % 2 === 0;

export function NoteListGroupFormBit({
    // notes: currentNotesForItem = [],
    availableNotes,
    onAddNote,
    attachedNoteIds = [],
}: NoteListGroupFormBitProps): JSX.Element {

    // render out list for each note and theyll each have checkbox to nselect them
//** oooorrrrr or maybe like a Small version of the noteList... llike query and seelct and find insidethe square


    // const isAttached = (id: string) => currentNotesForItem && currentNotesForItem.find(note => note.id === id) ? true : false;

    const renderNoteSelection = availableNotes.map((note: RawNote, index: number) => (
        <ListGroup.Item className={`listItem-associatedNotes${isEven(index) ? '-alt' : ''}`} key={uuidv4()}>
            <Form.Check
                // type="switch"
                type="checkbox"
                id={`switch-note-${note.id}`}
                label={note.title}
                // checked={isAttached(note.id)}
                onChange={() => onAddNote(note.id)}
            />
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