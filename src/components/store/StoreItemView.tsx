// import { DetailForm } from "./form/DetailForm"
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup } from "react-bootstrap";
import { StoreItem } from "./StoreItem";


// // PU HERE! gget the edit button to takeu to that detail step in form 
// * and get the associated notes looking good here and in detail form
// TODO make each note thats attached be a link

export function StoreItemView() {
    const { item_id } = useParams();
    const navigate = useNavigate();
    const { getStoreItemById } = useShoppingCart();
    const item = getStoreItemById(item_id || '');


    // * disabled version of DetailForm... could have been better by sharing the components but oh well


    const handleEditClick = () => navigate(`/admin/${item.id}/edit`);

    return (
        <div>
            <Container className="form-view-container">
                <div className="top-right-container">
                    <Button className="carto-btn-alt" onClick={handleEditClick}>Edit</Button>
                </div>
                <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
                    View Details: {item.name}
                </h2>
                <div style={{
                    display: "grid",
                    gap: "1rem .5rem",
                    justifyContent: "center",
                    gridTemplateColumns: "auto minmax(auto, 400px)",
                }}>
                    <label>Price: </label>
                    <input type="text" className="form-control" value={item.price} disabled maxLength={20} />
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
        </div>
    )
}