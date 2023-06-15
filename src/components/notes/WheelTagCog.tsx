import { MouseEvent, useRef, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
// import { GiCartwheel } from 'react-icons/gi';
import ListGroup from 'react-bootstrap/ListGroup';
import Overlay from 'react-bootstrap/Overlay';
// import { BsChevronDown } from 'react-icons/bs';
import { StoreItemTag } from '../../types';
// import Stack from 'react-bootstrap/Stack';
import { IoPricetags } from 'react-icons/io5';
// import { StoreItemView } from "../store/StoreItemView";
import { CartoModal } from '../CartoModal';





export function WheelTagCog(props: any) {
    const { storeItemTags } = props;
    const targetRef = useRef(null);
    const [ showOverlay, setShowOverlay ] = useState(false);

    const [ showModal, setShowModal ] = useState(false);
    const [ modal_storeId, setModal_storeId ] = useState<string>('');


    const handleMouseClick = (e: MouseEvent) => {
        e.stopPropagation();
        setShowOverlay(true);
    };

    useEffect(() => {
        document.getElementById('root')!.addEventListener('mousedown', e => handleOutsideClick(e as any));
        return () => document.getElementById('root')!.removeEventListener('mousedown', e => handleOutsideClick(e as any));
    }, []);

    function handleOutsideClick(e: MouseEvent): void {
        // console.log('outside click');
        const mouseLocation = e.target;
        // if it's not in the overlay or inside a card OR the modals not open, then close it
        if (mouseLocation !== targetRef.current) setShowOverlay(false);
        return;
    }

    const isEven = (num: number) => num % 2 === 0;

    return (
        <>
            <Overlay target={targetRef.current} show={showOverlay} placement="top-start">
                <ListGroup className="storeTags-listGroup-card">
                    <ListGroup.Item className="storeTags-listGroup-card-title">
                        Store Tags ({storeItemTags.length})
                        {/* <span style={{ marginBottom: '2px' }}>+</span> */}
                    </ListGroup.Item>
                    <span className="innerGroup-storeTags-card">
                        {storeItemTags.length > 0 && storeItemTags.map((storeTag: StoreItemTag, index: number) => (
                            // * the tag.id is === the associated storeItem.id
                            <ListGroup.Item
                                id={storeTag.id}
                                // as={Link} to={`/admin/${tag.id}/view`}
                                // onClick={e => e.stopPropagation()}
                                onClick={(e: any) => {
                                    e.stopPropagation();
                                    setModal_storeId(storeTag.id);
                                    setShowModal(true);
                                }}
                                className={`storeTags-listGroup-card-list-item ${isEven(+index) ? 'alt-listItem' : ''}`}
                                key={storeTag.id}>
                                <Badge className='text-truncate store-tag-badge' >
                                    {storeTag.label}
                                </Badge>
                            </ListGroup.Item>
                        ))}
                    </span>
                </ListGroup>
            </Overlay>
            <div className="cog-div-noteCard" ref={targetRef}
                onClick={e => handleMouseClick(e)}>
                {/* <Stack direction='horizontal'> */}
                {/* <HiOutlineViewList size="20" /><BsChevronDown size="10" /> */}
                <IoPricetags size="20" />
                {/* <BsChevronDown size="10" />.. redundant */}
                {/* </Stack> */}
            </div>
            <CartoModal
                show={showModal}
                itemId={modal_storeId}
                onHide={(e: any) => {
                    e.stopPropagation();
                    setShowModal(false);
                }}
                modalHeader='tersdfgsjd'
            />

        </>
    )
}