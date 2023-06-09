import { useState } from 'react';
import { Stack, Col, Badge } from 'react-bootstrap';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Tag } from '../../types';
import { OverlayInfoWrapper } from '../../utilities/OverlayInfoWrapper';
import { useNote } from "./NoteLayout";
import { CartoModal } from '../CartoModal';
import { StoreItemView } from '../store/StoreItemView';


export function TagRows() {
    const note = useNote();
    const [ showLocalModal, setShowLocalModal ] = useState(false);
    const [ modal_storeId, setModal_storeId ] = useState<string>('');

    const tagRow = note.tags.map((tag: Tag) => (
        <Badge className='text-truncate raw-tag-badge-view' key={tag.id}>
            {tag.label}
        </Badge>
    ));

    const storeTagRow = note.storeItemTags.map((tag: Tag) => (
        <Badge className='text-truncate store-tag-badge' key={tag.id}
            onClick={(e: any) => {
                e.stopPropagation();
                setModal_storeId(tag.id);
                setShowLocalModal(true);
            }}>
            {tag.label}
        </Badge>
    ));

    const stackWrapper = (children: JSX.Element | JSX.Element[], type: string) => (
        <Stack gap={1} direction="horizontal" className={`flex-wrap ${type === 'rawTag' ? 'mb-2' : ''}`}>
            {children}
            <OverlayInfoWrapper tagType={type} placement="right"
                children={<BsFillInfoCircleFill className={`${type}-infoIcon`} />}
            />
        </Stack>
    );

    return (
        <>
            <Col>
                <h1>{note.title}</h1>
                {note.tags.length > 0 && stackWrapper(tagRow, 'rawTag')}
                {note.storeItemTags.length > 0 && stackWrapper(storeTagRow, 'storeTag')}
            </Col>
            <CartoModal show={showLocalModal}
                onHide={(e: any = null) => {
                    if (e) e.stopPropagation();
                    setShowLocalModal(false);
                }}
                onShow={() => { }}
                modalbodycomponent={<StoreItemView item_id={modal_storeId} />}
            />
        </>
    )
}