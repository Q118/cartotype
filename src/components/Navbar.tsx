import { Container, Nav, Navbar as NavbarBS, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { ThemeToggler } from './ThemeToggler';
import { useTheme } from '../context/ThemeContext';

const DIV_CLASSES: string = "rounded-circle bg-danger d-flex justify-content-center align-items-center";

export function Navbar() {
    const { currentTheme } = useTheme();
    const { openCart, cartQuantity } = useShoppingCart();

    const btnVariant = currentTheme === 'dark' ? 'outline-light' : 'outline-dark';

    return (
        <NavbarBS id='cartotype-navbar' sticky='top' className={`shadow-sm mb-3 cart-bg-${currentTheme} cart-nav`}>
            <Container>
                <Nav className='me-auto'>
                    <Nav.Link as={NavLink} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/store">
                        Store
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/admin">
                        Admin
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/notes">
                        Notes
                    </Nav.Link>
                </Nav>
                <ThemeToggler />
                {cartQuantity > 0 && (
                    <Button onClick={openCart} variant={btnVariant} className="nav-cart-button">
                        <GiShoppingCart
                            style={{ width: "2.5rem", height: "2.5rem", color: 'inherit' }} />
                        <div className={DIV_CLASSES} id="cart-quantity-wrapper">
                            {cartQuantity}
                        </div>
                    </Button>
                )}
            </Container>

        </NavbarBS>
    )
}