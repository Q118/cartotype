import { useNote } from "./NoteLayout";
import { Badge, Button, Stack, Row, Col } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { VscTrash } from "react-icons/vsc";

type NoteProps = {
    onDelete: (id: string) => void;
}

//!!!! PU IN HERE!!!!!
//! GET the storeItemTags logic implemented!


// TODO modulate out parts of this file

export function Note({ onDelete }: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();
    // const { globalStoreItemTags } = useShoppingCart();

    const overlay = (tagType: string) => (
        <Tooltip id={`tooltip-${tagType}`}>
            <span className={`tag-the-${tagType}`}>
                <strong>{tagType === 'rawTag' ? 'User Selected Tags' : 'Store Tags'}</strong>
            </span>
        </Tooltip>
    );

        console.log('note: ', note);
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap mb-2">
                            {note.tags.map(tag => (
                                <Badge className='text-truncate raw-tag-badge-view' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                            <OverlayTrigger placement="right" overlay={overlay("rawTag")}>
                                <a style={{ cursor: 'pointer' }}>
                                    <BsFillInfoCircleFill className="rawTag-infoIcon" />
                                </a>
                            </OverlayTrigger>
                        </Stack>
                    )}
                    {note.storeItemTags!.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {note.storeItemTags!.map(tag => (
                                <Badge className='text-truncate store-tag-badge' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                            <OverlayTrigger placement="right" overlay={overlay("storeTag")}>
                                <a style={{ cursor: 'pointer' }}>
                                    <BsFillInfoCircleFill className="storeTag-infoIcon" />
                                </a>
                            </OverlayTrigger>
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal" className="justify-content-end mb-2">
                        <Link to="edit">
                            <Button className="carto-btn" title="edit note">
                                Edit
                            </Button>
                        </Link>
                        <Link to="..">
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