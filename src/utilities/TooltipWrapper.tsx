import { ReactElement, JSXElementConstructor } from "react";
// import { OverlayChildren } from "react-bootstrap/esm/Overlay";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


type TooltipWrapperProps = {
    overlayTitle: string,
    placement: 'top' | 'bottom' | 'left' | 'right',
    children: ReactElement<any, string | JSXElementConstructor<any>>
}


export function TooltipWrapper({
    overlayTitle,
    children,
    placement
}: TooltipWrapperProps) {


    return (
        <OverlayTrigger placement={placement} overlay={
            <Tooltip>
                {overlayTitle}
            </Tooltip>
        }>
            {children}
        </OverlayTrigger>
    )

}