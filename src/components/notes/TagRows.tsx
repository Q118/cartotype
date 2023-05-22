import { Stack, Col, Badge } from 'react-bootstrap';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Note, Tag, StoreItemTag } from '../../types';
import { OverlayInfoWrapper } from '../../utilities/OverlayInfoWrapper';
import { useNote } from "./NoteLayout";



export function TagRows() {
    const note = useNote();

    return (
        <Col>
            <h1>{note.title}</h1>
            {note.tags.length > 0 && (
                <Stack gap={1} direction="horizontal" className="flex-wrap mb-2">
                    {note.tags.map((tag: Tag) => (
                        <Badge className='text-truncate raw-tag-badge-view' key={tag.id}>
                            {tag.label}
                        </Badge>
                    ))}
                    <OverlayInfoWrapper tagType="rawTag" placement="right"
                        children={<><BsFillInfoCircleFill className="rawTag-infoIcon" /></>}
                    />
                </Stack>
            )}
            {note.storeItemTags!.length > 0 && (
                <Stack gap={1} direction="horizontal" className="flex-wrap">
                    {note.storeItemTags!.map((tag: Tag) => (
                        <Badge className='text-truncate store-tag-badge' key={tag.id}>
                            {tag.label}
                        </Badge>
                    ))}
                    <OverlayInfoWrapper tagType="storeTag" placement="right"
                        children={<><BsFillInfoCircleFill className="storeTag-infoIcon" /></>}
                    />
                </Stack>
            )}
        </Col>
    )
}