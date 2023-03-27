import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

const TITLE_CLASSES: string = 'd-flex justify-content-between align-items-baseline mb-4';
const INNER_BTN_CLASSES: string = 'd-flex align-items-center flex-column';
const BTN_WRAPPER_CLASSES: string = 'd-flex align-items-center justify-content-center';

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
    } = useShoppingCart();



    const quantity: number = getItemQuantity(id);

    return (
        <>
            <Card className='h-100'>
                <Card.Img
                    variant="top"
                    src={imgUrl}
                    height="200px"
                    style={{ objectFit: 'cover' }}
                />
                <Card.Body className='d-flex flex-column bg-secondary text-white'>
                    <Card.Title className={TITLE_CLASSES}>
                        <span className='fs-2'>{name}</span>
                        <span className='ms-2 h6'>{formatCurrency(price)}</span>
                    </Card.Title>
                    {/* mt-auto to fill all aviailable  space */}
                    <div className='mt-auto'>
                        {quantity === 0 ? (
                            <Button className='w-100' onClick={() => increaseCartQuantity(id)}>
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
