import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';


type CartItemProps = {
    id: string;
    quantity: number;
};



export function CartItem({ id, quantity }: CartItemProps) {

    const { globalStoreItems: storeItems } = useShoppingCart();
    const { removeFromCart } = useShoppingCart();


    const item = storeItems.find((item: { id: string; }) => item.id === id);
    if (item == null) return (<></>);

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} className="cart-img-item" />
            {/* //* push everything to the far right w me-auto */}
            <div className="me-auto">
                <div>
                    {item.name}{' '}
                    {quantity > 1 && (
                        <span style={{ fontSize: ".75rem" }}>
                            ( x{quantity} )
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(id, item.name)}
            >&times;
            </Button>
        </Stack>
    )
}