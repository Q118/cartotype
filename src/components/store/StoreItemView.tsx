// import { DetailForm } from "./form/DetailForm"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Stack } from "react-bootstrap";
import { StoreItem } from "./StoreItem";
import { formatCurrency } from "../../utilities/formatCurrency";

// * and get the associated notes looking good here and in detail form
// TODO make each note thats attached be a link

// TODO get the price to be formatted correctly

// !! PU in here. get going with the editing of the notes in the storeItem.




export function StoreItemView() {
    const { item_id } = useParams();
    const navigate = useNavigate();
    const { getStoreItemById } = useShoppingCart();
    const item = getStoreItemById(item_id || '');

    console.log('item', item);
    // * disabled version of DetailForm... could have been better by sharing the components but oh well


    const handleEditClick = () => navigate(`/admin/${item.id}/edit`);

    return (
        <Container className="form-view-container">
            <Stack gap={3} direction="horizontal" className="justify-content-center">
                <Button className="carto-btn" onClick={() => navigate('/notes')}>Back</Button>
                <h2 style={{ textAlign: "center", marginBottom: "2rem", marginRight: "2rem", marginLeft: "2rem" }}>
                    View Details: {item.name}
                </h2>
                <Button className="carto-btn-alt" onClick={handleEditClick}>Edit</Button>
            </Stack>
            <div className="div-grid-cols-admin">
                <label>Price: </label>
                <input type="text" className="form-control" value={formatCurrency(item.price)} disabled maxLength={20} />
                <label>Official Title: </label>
                <input type="text" className="form-control"
                    value={item.name}
                    maxLength={20} disabled
                />
                <label>Associated Notes</label>
                <ListGroup className="listGroup-associatedNotes">
                    <ListGroup.Item className="listItem-associatedNotes">note 1</ListGroup.Item>
                    <ListGroup.Item className="listItem-associatedNotes-alt">fmds,mf,.ds</ListGroup.Item>
                    <ListGroup.Item className="listItem-associatedNotes">note 2</ListGroup.Item>
                    <ListGroup.Item className="listItem-associatedNotes-alt">note dmsadka</ListGroup.Item>
                    <ListGroup.Item className="listItem-associatedNotes">ghfjdhdsk</ListGroup.Item>
                </ListGroup>
                <h6>Preview:</h6>
                <div style={{ maxWidth: '250px' }}>
                    <StoreItem
                        name={item.name}
                        price={item.price}
                        imgUrl={item.imgUrl}
                        id={item.id}
                        isPreview={true}
                    />
                </div>
            </div>
        </Container>
    )
}