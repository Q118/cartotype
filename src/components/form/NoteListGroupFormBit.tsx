import { v4 as uuidv4 } from 'uuid';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { RawNote, RawNotedata, ResultItem } from '../../types';
// import { SelectableWrapper } from '../../utilities/SelectableWrapper';
// TODO display prettier with selectable wrapper
//** oooorrrrr or maybe like a Small version of the noteList... llike query and seelct and find insidethe square


type NoteListGroupFormBitProps = {
    selectedItem: any;
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
    selectedItem
}: NoteListGroupFormBitProps): JSX.Element {

    // render out list for each note and theyll each have checkbox to nselect them

// console.log(JSON.parse(selectedItem.notes));
    // const isAttached = (id: string) => .find(note => note.id === id) ? true : false;

    const isAttached = (id: string) => {
        const parsed_ids = JSON.parse(selectedItem.notes);
        // console.log(parsed_ids.includes(id));
        // return parsed_ids.includes(id);
        // attachedNoteIds.includes(id);
    }

    const renderNoteSelection = availableNotes && availableNotes.map((note: RawNote, index: number) => (
        <ListGroup.Item className={`listItem-associatedNotes${isEven(index) ? '-alt' : ''}`} key={uuidv4()}>
            <Form.Check
                // type="switch"
                type="checkbox"
                // checked={JSON.parse(selectedItem.notes).includes(note.id)}
                // defaultChecked={JSON.parse(selectedItem.notes).includes(note.id)}
                // checked={isAttached(note.id)}
                id={`switch-note-${note.id}`}
                label={note.title}
                // onChange={() => onAddNote(note.id)}
                onSelect={() => onAddNote(note.id)}
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