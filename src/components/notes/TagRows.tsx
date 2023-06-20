import { useState } from 'react';
import { Stack, Col, Badge } from 'react-bootstrap';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Note, Tag, StoreItemTag } from '../../types';
import { OverlayInfoWrapper } from '../../utilities/OverlayInfoWrapper';
import { useNote } from "./NoteLayout";
import { CartoModal } from '../CartoModal';
import { StoreItemView } from '../store/StoreItemView';

// TODO modulation

export function TagRows() {
    const note = useNote();
    const [ showLocalModal, setShowLocalModal ] = useState(false);
    const [ modal_storeId, setModal_storeId ] = useState<string>('');


    // const handleStoreItemTagClick = (storeItemTag: StoreItemTag) => {
    //     console.log('storeItemTag', storeItemTag);
    // };

    return (
        <>
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
                            children={<BsFillInfoCircleFill className="rawTag-infoIcon" />}
                        />
                    </Stack>
                )}
                {(note.storeItemTags && note.storeItemTags.length > 0) && (
                    <Stack gap={1} direction="horizontal" className="flex-wrap">
                        {note.storeItemTags!.map((tag: Tag) => (
                            <Badge className='text-truncate store-tag-badge' key={tag.id}
                                // onClick={() => handleStoreItemTagClick(tag)}
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    setModal_storeId(tag.id);
                                    setShowLocalModal(true);
                                }}
                            >
                                {tag.label}
                            </Badge>
                        ))}
                        <OverlayInfoWrapper tagType="storeTag" placement="right"
                            children={<BsFillInfoCircleFill className="storeTag-infoIcon" />}
                        />
                    </Stack>
                )}
            </Col>
            <CartoModal show={showLocalModal}
                onHide={(e: any = null) => {
                    if (e) e.stopPropagation();
                    setShowLocalModal(false);
                }} // unshowOverlay once modal is opened (cleaner)
                onShow={() => { }}
                modalbodycomponent={<StoreItemView item_id={modal_storeId} />}
            />
        </>
    )
}