/**
 * Admin page
 * 
 * add items to the database store
 * or
 * edit items in the database store
 */
import { useState } from 'react';
import { FormApp } from "../components/form/FormApp";
import { EditForm } from "../components/EditForm";
import { useTheme } from "../context/ThemeContext";
import { Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';


// TODO: turn the buttons in to tabs so that they each are tabs for each page

export function Admin() {

    const [formPath, setFormPath] = useState<string | null>(null);


    const { currentTheme } = useTheme();
// TODO on the tabs, put  the overlay over those tabs


    const renderOverlayColumn = (type: string, title: string) => {
        const overlayTitle = type === 'add' ? 'add a new item to the shop' : 'edit the current items in the shop';
        return (
            <Col>
                <OverlayTrigger placement='top' overlay={
                    <Tooltip id={`${type}-tooltip`}>
                        {overlayTitle}
                    </Tooltip>
                }>
                    <Button variant="outline-light" id={`${currentTheme}Cart`} onClick={() => setFormPath(type)}>
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
