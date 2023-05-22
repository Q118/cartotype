import { ReactElement, JSXElementConstructor } from "react";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


type TooltipWrapperProps = {
    tagType: string,
    placement: 'top' | 'bottom' | 'left' | 'right',
    children: ReactElement<any, string | JSXElementConstructor<any>>
}


export function OverlayInfoWrapper({
    tagType,
    children,
    placement
}: TooltipWrapperProps) {


    return (
        <OverlayTrigger placement={placement} overlay={
            <Tooltip id={`tooltip-${tagType}`}>
                <span className={`tag-the-${tagType}`}>
                    <strong>{tagType === 'rawTag' ? 'User Selected Tags' : 'Store Tags'}</strong>
                </span>
            </Tooltip>
        }>
            <a style={{ cursor: 'pointer' }}>
                {children}
            </a>
        </OverlayTrigger>
    )
}