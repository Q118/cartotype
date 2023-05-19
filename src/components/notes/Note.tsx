import { useNote } from "./NoteLayout";
import { Badge, Button, Stack, Row, Col } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { VscTrash } from "react-icons/vsc";

type NoteProps = {
    onDelete: (id: string) => void;
}

//!!!! PU IN HERE!!!!!
// *hovering tooltips around them each row to know which is which...
//! AND THEN GET the storeItemTags logic implemented!
export function Note({ onDelete }: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap mb-2">
                            {/* <OverlayTrigger placement="bottom" overlay={<Tooltip id="tags-tooltip">Tags</Tooltip>}> */}
                            {note.tags.map(tag => (
                                <Badge className='text-truncate raw-tag-badge-view' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                            {/* </OverlayTrigger> */}
                        </Stack>
                    )}
                    {/* hovering tooltips around them each row to know which is which... */}

                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {/* Store Tags: */}
                            {note.tags.map(tag => (
                                <Badge className='text-truncate store-tag-badge' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    {/* {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap mb-2 justify-content-end">
                            StoreItem tags: 
                            {note.tags.map(tag => (
                                <Badge className='text-truncate store-tag-badge' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )} */}
                    <Stack gap={2} direction="horizontal" className="justify-content-end mb-2">
                        {/* <Link to={`${note.id}/edit`}> */}
                        <Link to="edit">
                            {/* <Button variant="primary">Edit</Button> */}
                            <Button className="carto-btn" title="edit note">
                                Edit
                            </Button>
                        </Link>
                        <Link to="..">
                            {/* <Button variant="secondary">Back</Button> */}
                            <Button className="carto-btn-alt" title="back to notes">
                                Back
                            </Button>
                        </Link>
                    </Stack>
                    <Stack direction="horizontal" className="justify-content-end">
                        <Button variant="none" title="delete note"
                        className="delete-note-btn" onClick={() => {
                            onDelete(note.id);
                            navigate('/notes');
                        }}>
                            <VscTrash />
                        </Button>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown children={note.markdown} remarkPlugins={[ remarkGfm ]} />
        </>
    )
}