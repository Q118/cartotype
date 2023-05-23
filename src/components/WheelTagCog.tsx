import { MouseEvent, useRef, useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { GiCartwheel } from 'react-icons/gi';
// import { Tooltip, Button, Stack, OverlayTrigger, Row } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Overlay from 'react-bootstrap/Overlay';
import { BsChevronDown } from 'react-icons/bs';
import { StoreItemTag } from '../types';
import { IconContext } from 'react-icons';
import Stack from 'react-bootstrap/Stack';
// a little list item popout that can scroll///


// TODO be able to click and go to that store item from it?,, and/or an add at the bottom of the list

export function WheelTagCog(props: any) {
    const { storeItemTags } = props;
    const targetRef = useRef(null);
    const [ showOverlay, setShowOverlay ] = useState(false);

    const handleMouseClick = (e: MouseEvent) => {
        // this is needed so that the click doesn't go to the card and open it
        e.stopPropagation();
        setShowOverlay(true);
    }
    // const handleMouseLeave = () => setShowOverlay(false);
    // const handleMouseEnter = () => setShowOverlay(true);

    useEffect(() => {
        document.addEventListener('mousedown', e => handleOutsideClick(e as any));
        return () => {
            document.removeEventListener('mousedown', e => handleOutsideClick(e as any));
        }
    }, [])


    function handleOutsideClick(e: MouseEvent): void {
        const mouseLocation = e.target;
        // if it's not in the overlay or inside a card, then close it
        if (mouseLocation !== targetRef.current) {
            setShowOverlay(false);
        }
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
                        {storeItemTags.length > 0 && storeItemTags.map((tag: StoreItemTag, index: number) => (
                            <ListGroup.Item
                                className={`storeTags-listGroup-card-list-item ${isEven(+index) ? 'alt-listItem' : ''}`}
                                key={tag.id}>
                                <Badge className='text-truncate store-tag-badge' >
                                    {tag.label}
                                </Badge>
                            </ListGroup.Item>
                        ))}
                    </span>
                </ListGroup>
            </Overlay>
            <div className="cog-div-noteCard" ref={targetRef}
                onClick={e => handleMouseClick(e)}>
                <Stack direction='horizontal' gap={1}>
                    <GiCartwheel size="20" /><BsChevronDown size="10" />
                </Stack>
            </div>
        </>
    )
}