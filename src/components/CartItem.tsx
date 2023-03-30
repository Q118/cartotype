import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useTheme } from '../context/ThemeContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';


type CartItemProps = {
    id: string;
    quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart();
    const { currentTheme } = useTheme();
    const item = storeItems.find((item) => item.id === id);
    if (item == null) return (<></>);

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={item.imgUrl}
                style={{ width: "125px", height: "75px", objectFit: "cover", border: `2px solid ${currentTheme === "dark" ? '#ccc' : 'black' }`, borderRadius: "5px" }}
            />
            {/* push everything to the far right w me-auto */}
            <div className="me-auto">
                <div>
                    {item.name}{' '}
                    {quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>
                {formatCurrency(item.price * quantity)}
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>
                &times;
            </Button>
        </Stack>
    )
}