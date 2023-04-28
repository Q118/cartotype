import { Link } from "react-router-dom";
import { SimplifiedNote } from "../../types";
import Card from 'react-bootstrap/Card';
import styles from '../../styles/NoteList.module.css';
import Stack from "react-bootstrap/esm/Stack";
import Badge from "react-bootstrap/Badge";
import { useTheme } from "../../context/ThemeContext";

export function NoteCard({ id, title, tags }: SimplifiedNote) {

    const { currentTheme } = useTheme();

    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card} bg-secondary card-${currentTheme}`} >
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-5">{title}</span>
                    {tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                            {tags.map(tag => (
                                <Badge key={tag.id} className="text-truncate">
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