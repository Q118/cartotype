import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SelectableWrapper } from '../../utilities/SelectableWrapper';
import { Tag, Note } from '../../types';
import { EditTagsModal } from './EditTagsModal';
import { NoteCard } from './NoteCard';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import { LoadingDivComponent } from '../LoadingDivComponent';


type NoteListProps = {
    availableTags: Tag[];
    notes: Note[];
    onDeleteTag: (id: string) => void;
    onUpdateTag: (id: string, label: string) => void;
    /** holds if the notes data is still loading */
    notesLoading: boolean;
}

export function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag, notesLoading }: NoteListProps) {
    const [ selectedTags, setSelectedTags ] = useState<Tag[]>([]);
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
                    ))
            )
        })
    }, [ title, selectedTags, notes ]);

    // using a asthetic arbitruary amount of skeleton cards
    // const skeletonArray = new Array(notes.length).fill(<Skeleton height={150} />);
    // * i mean i like this the skeletons.. .but i dont love it



    return (
        <>
            <Row className="align-items-center mb-4">
                <Col><h1>Notes</h1></Col>
                {/* //* use xs = auto to forcee it smallas possible while fitting */}
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="new">
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button variant="secondary" onClick={() => setEditTagsModalIsOpen(true)}>
                            Edit Tags
                        </Button>
                    </Stack>
                </Col>
            </Row>
            <hr />
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} placeholder='Search by title'
                                onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <SelectableWrapper
                                createOptionEnabled={false}
                                placeholder='Tags to filter by'
                                availableTags={availableTags}
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            {notesLoading && <LoadingDivComponent />}
            {!notesLoading && (<>
                <Row xs={1} md={2} lg={3} className="g-3">
                    {/* {notesLoading && skeletonArray} */}
                    {filteredNotes?.map(note => {
                        return (
                            <Col key={note.id}>
                                <NoteCard id={note.id} title={note.title} tags={note.tags} />
                            </Col>
                        )
                    })}
                </Row>
                <EditTagsModal
                    show={editTagsModalIsOpen}
                    handleClose={() => setEditTagsModalIsOpen(false)}
                    availableTags={availableTags}
                    onDeleteTag={onDeleteTag}
                    onUpdateTag={onUpdateTag}
                />
            </>)}
        </>
    )
}