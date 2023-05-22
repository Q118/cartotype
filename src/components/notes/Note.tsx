import { useNote } from "./NoteLayout";
import { Button, Stack, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { TagRows } from "./TagRows";

type NoteProps = {
    onDelete: (id: string) => void;
}


export function Note({ onDelete }: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();


    return (
        <>
            <Row className="align-items-center mb-4">
                <TagRows />
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal" className="justify-content-end mb-2">
                        <Link to="edit"><Button className="carto-btn" title="edit note">
                            Edit
                        </Button></Link>
                        <Link to=".."><Button className="carto-btn-alt" title="back to notes">
                            Back
                        </Button></Link>
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