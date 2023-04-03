import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useTheme } from '../context/ThemeContext';


const TITLE_CLASSES: string = 'd-flex justify-content-between align-items-baseline mb-4';
const INNER_BTN_CLASSES: string = 'd-flex align-items-center flex-column';
const BTN_WRAPPER_CLASSES: string = 'd-flex align-items-center justify-content-center';
// const CARD_CLASSES: string = 'd-flex flex-column ';

type StoreItemProps = {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
    isPreview: boolean;
};

export function StoreItem({ id, name, price, imgUrl, isPreview = false }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
    } = useShoppingCart();
    const { currentTheme } = useTheme();


    const quantity: number = getItemQuantity(id);

    const currentThemeClasses: string = currentTheme === 'dark' ? 'bg-secondary text-white' : 'bg-white text-dark';




    return (
        <>
            <Card className={`h-100 ${isPreview}-preview`} style={{
                border: `1px solid ${currentTheme === 'dark' ? '#ccc' : 'black'}`,
            }}>
                <Card.Img
                    variant="top"
                    src={imgUrl}
                    height="200px"
                    style={{ objectFit: 'cover' }}
                    // title='' TODO
                />
                <Card.Body
                    className={`d-flex flex-column ${currentThemeClasses}}`}
                >
                    {/* <Card.Body className='d-flex flex-column bg-secondary text-white'> */}
                    <Card.Title className={TITLE_CLASSES}>
                        <span className='fs-2'>{name}</span>
                        <span className='ms-2 h6'>{formatCurrency(price)}</span>
                    </Card.Title>
                    {/* mt-auto to fill all aviailable  space */}
                    <div className='mt-auto'>
                        {quantity === 0 ? (
                            <Button className='w-100' onClick={() => increaseCartQuantity(id)} disabled={isPreview}>
                                + Add To Cart
                            </Button>
                        ) : (
                            <div className={INNER_BTN_CLASSES} style={{ gap: ".5rem" }}>
                                <div className={BTN_WRAPPER_CLASSES} style={{ gap: ".5rem" }}>
                                    <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                    <div>
                                        <span className='fs-3'>{quantity}</span> in cart
                                    </div>
                                    <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                                </div>
                                <Button variant="danger" size='sm' onClick={() => removeFromCart(id)}>
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}
