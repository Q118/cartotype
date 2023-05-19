import { Link } from "react-router-dom";
import { SimplifiedNote } from "../../types";
import Card from 'react-bootstrap/Card';
import styles from '../../styles/NoteList.module.css';
import Stack from "react-bootstrap/esm/Stack";
import Badge from "react-bootstrap/Badge";

//* the tags cahn filter the notes


export function NoteCard({ id, title, tags }: SimplifiedNote) {

    return (
        <Card as={Link} to={`${id}`} className={`h-100 text-reset text-decoration-none ${styles.card} note-card`} >
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-5">{title}</span>
                    {tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                            {tags.map(tag => (
                                <Badge key={tag.id} className="store-tag-badge" pill={true}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    )
}