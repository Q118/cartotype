import { useNavigate } from "react-router-dom";
import { SimplifiedNote } from "../../types";
import Card from 'react-bootstrap/Card';
import styles from '../../styles/NoteList.module.css';
import Stack from "react-bootstrap/esm/Stack";
import Badge from "react-bootstrap/Badge";
// import { IconContext } from "react-icons";
import { WheelTagCog } from "../WheelTagCog";

//* the tags cahn filter the notes




export function NoteCard({ id, title, tags, storeItemTags }: SimplifiedNote) {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`${id}`);
    }

    return (
        <Card onClick={handleCardClick} className={`h-100 text-reset text-decoration-none ${styles.card} note-card`} >
            <Card.Body>
                <WheelTagCog storeItemTags={storeItemTags} />
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