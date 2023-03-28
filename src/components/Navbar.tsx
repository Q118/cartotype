import { Container, Nav, Navbar as NavbarBS, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggler } from './ThemeToggler';


export function Navbar() {

    const { openCart, cartQuantity } = useShoppingCart();
    const { currentTheme } = useTheme();

    return (
        <NavbarBS sticky='top' className={`bg-${currentTheme === 'dark' ? 'secondary' : 'white'} shadow-sm mb-3`}>
            <Container>
                <Nav className='me-auto'>
                    <Nav.Link as={NavLink} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/store">
                        Store
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/about">
                        About
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/notes">
                        Notes
                    </Nav.Link>
                </Nav>
                <ThemeToggler />
                {cartQuantity > 0 && (
                    <Button
                        onClick={openCart}
                        variant="outline-light"
                        className="rounded-circle"
                        style={{
                            width: "3rem",
                            height: "3rem",
                            padding: "0.3rem",
                            position: "relative",
                        }}>
                        <GiShoppingCart style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            color: "inherit",
                        }} />
                        <div
                            className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
                            style={{
                                color: "white",
                                width: "1.5rem",
                                height: "1.5rem",
                                position: "absolute",
                                bottom: "0",
                                right: "0",
                                transform: "translate(25%, 25%)",
                            }}
                        >
                            {cartQuantity}
                        </div>
                    </Button>
                )}
            </Container>

        </NavbarBS>
    )
}