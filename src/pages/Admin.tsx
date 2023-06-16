/**
 * Admin page
 * add items to the database store || edit items in the database store
 */
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { FormApp } from "../components/form/AddForm";
import { EditForm } from "../components/form/EditForm";
import { Container, Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { AdminLayout } from '../components/AdminLayout';
import { StoreItemView } from '../components/store/StoreItemView';
import { useShoppingCart } from '../context/ShoppingCartContext';

// TODO: turn the buttons in to tabs so that they each are tabs for each page

export function Admin() {
    const { globalStoreItems } = useShoppingCart();
    const navigate = useNavigate();
    const { currentTheme } = useTheme();
    const btnVariant = currentTheme === 'dark' ? 'outline-light' : 'outline-dark';

    const handleClick = (type: string) => {
        if (type === 'add') navigate('add');
        else if (type === 'edit') navigate('edit');
    };

    const renderOverlayColumn = (type: string, title: string) => <Col>
        <OverlayTrigger placement='top' overlay={<Tooltip id={`${type}-tooltip`}>
            {type === 'add' ? 'add a new item to the shop' : 'edit the current items in the shop'}
        </Tooltip>}><Button variant={btnVariant} onClick={() => handleClick(type)}>{title}</Button>
        </OverlayTrigger>
    </Col>;



    return (
        <Container className="my-4">
            <h1>Admin Dashboard</h1><hr />
            <Routes>
                <Route path='/' element={<><p>Select an option:</p>
                    <Row className="p-2 text-center">
                        {renderOverlayColumn('add', 'Add New Item')}
                        {renderOverlayColumn('edit', 'Edit Items')}
                    </Row>
                </>} />
                <Route path='add' element={<FormApp />} />
                <Route path='edit' element={<EditForm />} />
                <Route path='/:item_id' element={<AdminLayout items={globalStoreItems} />}>
                    <Route path="edit" element={<EditForm startStep={1} />} />
                    <Route path="view" element={<StoreItemView
                        item_id={useParams().item_id || ""} />} />
                </Route>
            </Routes>
        </Container>
    );
}
