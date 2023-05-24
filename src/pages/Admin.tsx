/**
 * Admin page
 * 
 * add items to the database store
 * or
 * edit items in the database store
 */
import { useState } from 'react';
// import { useParams, useLocation, useHref } from 'react-router-dom'; not available when from the notes since it was outside the dom that called itnk
// import { useLocation } from 'react-router-dom';
import { FormApp } from "../components/form/AddForm";
import { EditForm } from "../components/form/EditForm";
import { Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

// TODO: turn the buttons in to tabs so that they each are tabs for each page
// import { TooltipWrapper } from '../utilities/TooltipWrapper'; <- dont

type AdminProps = {
    renderAtStep?: number;
};

export function Admin({ renderAtStep = 0 }: AdminProps) {
    // = useHref();
    // console.log(useLocation())

    // const { pathname } = useLocation();
    // it isnt reading the search params i think bcthe link is not within the router context so even tho it displays like it is, it isnt actually... leads me back to wanted to just manually tellt he Admin page to go TO certain step. which was my original idea

    const [ formPath, setFormPath ] = useState<string | null>(null);
    const { currentTheme } = useTheme();
    const btnVariant = currentTheme === 'dark' ? 'outline-light' : 'outline-dark';

    const renderOverlayColumn = (type: string, title: string) => {
        const overlayTitle = type === 'add' ? 'add a new item to the shop' : 'edit the current items in the shop';
        return (
            <Col>
                <OverlayTrigger placement='top' overlay={
                    <Tooltip id={`${type}-tooltip`}>
                        {overlayTitle}
                    </Tooltip>
                }>
                    <Button variant={btnVariant} onClick={() => setFormPath(type)}>
                        {title}
                    </Button>
                </OverlayTrigger>
            </Col>
        )
    };



    return (
        <>
            <h1>Admin Dashboard</h1>
            <hr />
            {/* {pathname.includes('/edit/') ? <EditForm renderAtStep={renderAtStep} /> : (
                <>
                
                </>
            )} */}
            {formPath == null && (
                <>
                    <p>Select an option:</p>
                    <Row className="p-2 text-center">
                        {renderOverlayColumn('add', 'Add New Item')}
                        {renderOverlayColumn('edit', 'Edit Items')}
                    </Row>
                </>
            )}
            {formPath === 'add' ? <FormApp /> : formPath === 'edit' ? <EditForm /> : null}
        </>
    );
}
