import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SelectableWrapper } from '../../utilities/SelectableWrapper';
import { Tag, Note, StoreItemTag } from '../../types';
import { EditTagsModal } from './EditTagsModal';
import { NoteCard } from './NoteCard';
import { LoadingDivComponent } from '../LoadingDivComponent';

// TODO (maybe) consider the skeleton laz loaders

type NoteListProps = {
    availableTags: Tag[];
    notes: Note[];
    onDeleteTag: (id: string) => void;
    onUpdateTag: (id: string, label: string) => void;
    /** holds if the notes data is still loading */
    notesLoading: boolean;
    /** store item tags */
    availableStoreItemTags: StoreItemTag[];

}

export function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag, notesLoading, availableStoreItemTags }: NoteListProps) {
    const [ selectedTags, setSelectedTags ] = useState<Tag[]>([]);
    const [ selectedStoreItemTags, setSelectedStoreItemTags ] = useState<StoreItemTag[]>([]);
    const [ title, setTitle ] = useState('');
    const [ editTagsModalIsOpen, setEditTagsModalIsOpen ] = useState(false);

    const filteredNotes = useMemo(() => {
        return notes?.filter(note => {
            return (
                (title === "" ||
                    note.title.toLowerCase().includes(title.toLowerCase())) &&
                //* check to make  sure the note has all of the tags being searched for
                (selectedTags.length === 0 ||
                    selectedTags.every(tag =>
                        note.tags.some(noteTag => noteTag.id === tag.id)
                    )) &&
                //* check to make sure the note has all of the store item tags being searched for
                (selectedStoreItemTags.length === 0 ||
                    selectedStoreItemTags.every(storeItemTag =>
                        note.storeItemTags.some(noteStoreItemTag => noteStoreItemTag.id === storeItemTag.id)
                    ))
            )
        })
    }, [ title, selectedTags, notes, selectedStoreItemTags ]);

    const renderFilteredNotes = filteredNotes?.map(note => <Col key={note.id}>
        <NoteCard id={note.id} title={note.title} tags={note.tags} storeItemTags={note.storeItemTags} />
    </Col>);

    const formGroupCol = (children: JSX.Element, label: string) => <Col>
        <Form.Group controlId={label.toLowerCase()}>
            <Form.Label>{label}</Form.Label>
            {children}
        </Form.Group>
    </Col>;


    return (
        <>
            <Row className="align-items-center mb-4">
                {/* //TODO make this row present for all Note Routes? */}
                <Col><h1>Notes</h1></Col>
                {/* //* use xs = auto to forcee it smallas possible while fitting */}
                <Col xs="auto"><Stack gap={2} direction="horizontal">
                    <Link to="new"><Button className="carto-btn">Create</Button></Link>
                    <Button className="carto-btn-alt" onClick={() => setEditTagsModalIsOpen(true)}>Edit Tags</Button>
                </Stack></Col>
            </Row><hr />
            <Form><Row className="mb-4">
                {formGroupCol(<Form.Control className='note-input' type="text" value={title} placeholder='Search by title'
                    onChange={e => setTitle(e.target.value)} />, 'Title')}
                {formGroupCol(<SelectableWrapper createOptionEnabled={false} placeholder='Tags to filter by'
                    availableTags={availableTags} selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags} isRawTag={true}
                />, 'Tags')}

                {formGroupCol(<SelectableWrapper createOptionEnabled={false} placeholder='Store Items to filter by'
                    availableTags={availableStoreItemTags} selectedTags={selectedStoreItemTags}
                    setSelectedTags={setSelectedStoreItemTags} isRawTag={false}
                />, 'Store Item Tags')}

            </Row></Form>
            {notesLoading && <LoadingDivComponent />}
            {!notesLoading && (<>
                <Row xs={1} md={2} lg={3} className="g-3">{renderFilteredNotes}</Row>
                <EditTagsModal show={editTagsModalIsOpen} handleClose={() => setEditTagsModalIsOpen(false)}
                    availableTags={availableTags} onDeleteTag={onDeleteTag} onUpdateTag={onUpdateTag}
                />
            </>)}
        </>
    )
}