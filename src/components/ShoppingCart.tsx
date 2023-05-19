import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
// import { useTheme } from "../context/ThemeContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";

export function ShoppingCart() {

    const { closeCart, cartItems, isOpen, globalStoreItems } = useShoppingCart();
    // const { currentTheme } = useTheme();

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end" className="sidebar-cart">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems?.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total:{" "}
                        {formatCurrency(
                            cartItems?.reduce((total, cartItem) => {
                                const item = globalStoreItems.find((i: { id: string }) => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}