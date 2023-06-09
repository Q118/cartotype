/**
 * Admin page
 * 
 * add items to the database store
 * or
 * edit items in the database store
 */
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// import { useParams, useLocation, useHref } from 'react-router-dom'; not available when from the notes since it was outside the dom that called itnk
// import { useLocation } from 'react-router-dom';
import { FormApp } from "../components/form/AddForm";
import { EditForm } from "../components/form/EditForm";
import { Container, Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { AdminLayout } from '../components/AdminLayout';
import { StoreItemView } from '../components/store/StoreItemView';
// import { useMultistepForm } from '../hooks/useMultistepForm';
import { useShoppingCart } from '../context/ShoppingCartContext';

// TODO: turn the buttons in to tabs so that they each are tabs for each page
// import { TooltipWrapper } from '../utilities/TooltipWrapper'; <- dont

type AdminProps = {
    renderAtStep?: number;
};

export function Admin({ renderAtStep = 0 }: AdminProps) {
    // = useHref();
    // console.log(useLocation())
    const { globalStoreItems } = useShoppingCart();

    const navigate = useNavigate();
    // const { pathname } = useLocation();
    // it isnt reading the search params i think bcthe link is not within the router context so even tho it displays like it is, it isnt actually... leads me back to wanted to just manually tellt he Admin page to go TO certain step. which was my original idea

    // const [ formPath, setFormPath ] = useState<string | null>(null);
    const { currentTheme } = useTheme();
    const btnVariant = currentTheme === 'dark' ? 'outline-light' : 'outline-dark';

    const handleClick = (type: string) => {
        if (type === 'add') navigate('add');
        else if (type === 'edit') navigate('edit');
    };



    const renderOverlayColumn = (type: string, title: string) => {
        const overlayTitle = type === 'add' ? 'add a new item to the shop' : 'edit the current items in the shop';
        return (
            <Col>
                <OverlayTrigger placement='top' overlay={
                    <Tooltip id={`${type}-tooltip`}>
                        {overlayTitle}
                    </Tooltip>
                }>
                    <Button variant={btnVariant} onClick={() => handleClick(type)}>
                        {title}
                    </Button>
                </OverlayTrigger>
            </Col>
        )
    };



    return (
        <Container className="my-4">
            <h1>Admin Dashboard</h1>
            <hr />


            <Routes>
                <Route path='/' element={<>
                    <p>Select an option:</p>
                    <Row className="p-2 text-center">
                        {renderOverlayColumn('add', 'Add New Item')}
                        {renderOverlayColumn('edit', 'Edit Items')}
                    </Row>
                </>} />
                <Route path='add' element={<FormApp />} />
                <Route path='edit' element={<EditForm />} />
                <Route path='/:item_id' element={<AdminLayout items={globalStoreItems} />}>
                    <Route path="edit" element={<EditForm startStep={1} />} /> 
                    <Route path="view" element={<StoreItemView />} />
                </Route>
            </Routes>
        </Container>
    );
}
