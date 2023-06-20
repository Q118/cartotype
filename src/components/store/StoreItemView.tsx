/** disabled version of DetailForm... could have been better by sharing the components but oh well */
import { useShoppingCart } from "../../context/ShoppingCartContext"
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Stack } from "react-bootstrap";
import { StoreItem } from "./StoreItem";
import { formatCurrency } from "../../utilities/formatCurrency";

// import { GiStabbedNote } from 'react-icons/gi'; // TODO use this icon for the attached note sin the stoer items in the stoer and in that previewm confirm


const isEven = (num: number) => num % 2 === 0;

type StoreItemViewProps = {
    item_id: string;
}

// TODO maybe no navigating to the note item since already in the notes...
// * maybe just a hovered preview of the note item...

export function StoreItemView(props: StoreItemViewProps) {
    const { item_id } = props;
    const navigate = useNavigate();
    const { getStoreItemById, availableNotes } = useShoppingCart();

    const item = getStoreItemById(item_id || '');

    const handleEditClick = (e: Event) => {
        e.stopPropagation();
        navigate(`/admin/${item.id}/edit`);
    }

    const associatedNotes = (item.notes && item.notes.length > 0) ? item.notes.map((note: any, index: number) => {
        let noteObj = availableNotes.find((availableNote: any) => availableNote.id === note);
        if (noteObj) {
            return (
                <ListGroup.Item key={noteObj.id}
                    className={`listItem-associatedNotes${isEven(index) ? '-alt' : ''}`}>
                    <Link to={"/notes/" + noteObj.id} relative="path">
                        {noteObj.title}
                    </Link>
                </ListGroup.Item>
            )
        } else return null;
    }) : (<ListGroup.Item className="listItem-associatedNotes">
        No notes associated with this item
    </ListGroup.Item>);

    return (
        <Container>
            <Stack gap={3} direction="horizontal" className="justify-content-center">
                <h2 style={{ textAlign: "center", marginBottom: "2rem", marginRight: "2rem", marginLeft: "2rem" }}>
                    View Details: {item.name}
                </h2>
                <Button className="carto-btn-alt" onClick={(e) => handleEditClick(e as unknown as Event)}>Edit</Button>
            </Stack>
            <div className="div-grid-cols-admin">
                <label>Price: </label>
                <input type="text" className="form-control" value={formatCurrency(item.price)} disabled maxLength={20} />
                <label>Official Title: </label>
                <input type="text" className="form-control" value={item.name} maxLength={20} disabled />
                <label>Associated Notes</label>
                <ListGroup className="listGroup-associatedNotes">{associatedNotes}</ListGroup>
                <h6>Preview:</h6>
                <div style={{ maxWidth: '250px' }}>
                    <StoreItem name={item.name}
                        price={item.price} imgUrl={item.imgUrl}
                        id={item.id} isPreview={true} />
                </div>
            </div>
        </Container>
    )
}