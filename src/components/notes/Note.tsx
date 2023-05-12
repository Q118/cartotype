import { useNote } from "./NoteLayout";
import { Badge, Button, Stack, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


type NoteProps = {
    onDelete: (id: string) => void;
}


export function Note({ onDelete }: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {note.tags.map(tag => (
                                <Badge className='text-truncate' key={tag.id} bg="secondary">
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        {/* <Link to={`${note.id}/edit`}> */}
                        <Link to="edit">
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button variant="danger" onClick={() => {
                            onDelete(note.id);
                            navigate('/notes');
                        }}>
                            Delete
                        </Button>
                        <Link to="..">
                            <Button variant="secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown children={note.markdown} remarkPlugins={[remarkGfm]} />
        </>
    )
}