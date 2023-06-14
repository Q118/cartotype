import { v4 as uuidv4 } from 'uuid';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { RawNote } from '../../types';
// TODO display prettier with selectable wrapper
//** oooorrrrr or maybe like a Small version of the noteList... llike query and seelct and find insidethe square


// TODO figuuyre out why its note sending the title..

type NoteListGroupFormBitProps = {
    selectedItem: any;
    onAddOrRemoveNote: (id: string) => void;
    availableNotes: RawNote[];
    attachedNoteIds: string[];
    // ? tags
};

const isEven = (num: number) => num % 2 === 0;

export function NoteListGroupFormBit({
    // notes: currentNotesForItem = [],
    availableNotes,
    onAddOrRemoveNote,
    attachedNoteIds = [],
    selectedItem
}: NoteListGroupFormBitProps): JSX.Element {


    const renderNoteSelection = availableNotes && availableNotes.map((note: RawNote, index: number) => (
        <ListGroup.Item className={`listItem-associatedNotes${isEven(index) ? '-alt' : ''}`} key={uuidv4()}>
            <Form.Check
                type="checkbox"
                checked={attachedNoteIds?.includes(note.id) || false}
                id={`switch-note-${note.id}`}
                label={note.title}
                onChange={() => onAddOrRemoveNote(note.id)}
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