import { MouseEvent, useRef, useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Overlay from 'react-bootstrap/Overlay';
import { StoreItemTag } from '../../types';
import { IoPricetags } from 'react-icons/io5';
import { CartoModal } from '../CartoModal';
import { StoreItemView } from '../store/StoreItemView';



export function WheelTagCog(props: any) {
    const { storeItemTags } = props;
    const targetRef = useRef(null);
    const [ showOverlay, setShowOverlay ] = useState(false);
    const [ showLocalModal, setShowLocalModal ] = useState(false);
    const [ modal_storeId, setModal_storeId ] = useState<string>('');

    useEffect(() => {
        document.getElementById('root')!.addEventListener('mousedown', e => handleOutsideClick(e as any));
        return () => document.getElementById('root')!.removeEventListener('mousedown', e => handleOutsideClick(e as any));
    }, []);

    const handleMouseClick = (e: MouseEvent) => {
        e.stopPropagation();
        setShowOverlay(true);
    };

    function handleOutsideClick(e: MouseEvent): void {
        const mouseLocation = e.target;
        // if it's not in the overlay or inside a card, then close it
        if (mouseLocation !== targetRef.current) setShowOverlay(false);
        return;
    }

    const isEven = (num: number) => num % 2 === 0;

    const storeItemsSpan = storeItemTags.map((storeTag: StoreItemTag, index: number) => (
        // * the tag.id is === the associated storeItem.id
        <ListGroup.Item
            id={storeTag.id} key={storeTag.id}
            className={`storeTags-listGroup-card-list-item ${isEven(+index) ? 'alt-listItem' : ''}`}
            onClick={(e: any) => {
                e.stopPropagation();
                setModal_storeId(storeTag.id);
                setShowLocalModal(true);
            }}>
            <Badge className='text-truncate store-tag-badge'>{storeTag.label}</Badge>
        </ListGroup.Item>
    ));

    return (
        <>
            <Overlay target={targetRef.current} show={showOverlay} placement="top-start">
                <ListGroup className="storeTags-listGroup-card">
                    <ListGroup.Item className="storeTags-listGroup-card-title">
                        Store Tags ({storeItemTags.length})
                    </ListGroup.Item>
                    <span className="innerGroup-storeTags-card">
                        {storeItemTags.length > 0 && storeItemsSpan}
                    </span>
                </ListGroup>
            </Overlay>
            <div className="cog-div-noteCard" ref={targetRef} onClick={e => handleMouseClick(e)}>
                <IoPricetags size="20" />
                {/* // TODO: come back here and put the amount of tags showiner here next to icon or on top of  */}
            </div>
            <CartoModal show={showLocalModal} itemId={modal_storeId}
                onHide={(e: any) => {
                    e.stopPropagation();
                    setShowLocalModal(false);
                }} // unshowOverlay once modal is opened (cleaner)
                onShow={() => setShowOverlay(false)}
                modalBodyComponent={<StoreItemView item_id={modal_storeId} />}
            />
        </>
    )
}