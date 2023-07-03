import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { formatCurrency } from '../../utilities/formatCurrency';
import { StoreNoteCog } from './StoreNoteCog';
import { CreditBanner } from './CreditBanner';

const TITLE_CLASSES: string = 'd-flex justify-content-between align-items-baseline mb-4';
const INNER_BTN_CLASSES: string = 'd-flex align-items-center flex-column';
const BTN_WRAPPER_CLASSES: string = 'd-flex align-items-center justify-content-center';


type StoreItemProps = {
    id: string;
    name?: string;
    price: number | null;
    imgUrl: string;
    /** signifies if its for previewing in which some parts will be disabled */
    isPreview: boolean;
    creditorDisplayName: string;
};

export function StoreItem({ id, name = '', price, imgUrl, isPreview = false, creditorDisplayName }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();

    console.log('inside StoreItem', creditorDisplayName)

    const quantity: number = getItemQuantity(id);

    return (
        <>
            <Card className={`h-100 ${isPreview}-preview store-card_card-c`}>
                <Card.Img variant="top" src={imgUrl}
                    height="200px" style={{ objectFit: 'cover' }}
                />
                <div className="top-right-container">
                    <StoreNoteCog storeItem_id={id} isPreview={isPreview} />
                </div>
                {(creditorDisplayName && creditorDisplayName.length > 0) && (
                    <CreditBanner creditorDisplayName={creditorDisplayName} />
                )}
                <Card.Body className={`d-flex flex-column store-card_body-c`}>
                    <Card.Title className={TITLE_CLASSES}>
                        <span className='fs-2'>{name}</span>
                        <span className='ms-2 h6'>{formatCurrency(price)}</span>
                    </Card.Title>
                    {/* // * mt-auto to fill all aviailable space */}
                    <div className='mt-auto'>
                        {quantity === 0 ? (<Button className='w-100 add-btn-c' onClick={() => increaseCartQuantity(id, true, name)} disabled={isPreview}>
                            + Add To Cart
                        </Button>) : (<div className={INNER_BTN_CLASSES} style={{ gap: ".5rem" }}>
                            <div className={BTN_WRAPPER_CLASSES} style={{ gap: ".5rem" }}>
                                <Button className="carto-btn" onClick={() => decreaseCartQuantity(id)} disabled={isPreview}>-</Button>
                                <div><span className='fs-3'>{quantity}</span> in cart</div>
                                <Button className="carto-btn" onClick={() => increaseCartQuantity(id)} disabled={isPreview}>+</Button>
                            </div>
                            <Button size='sm' onClick={() => removeFromCart(id, name)} className="remove-btn-c" disabled={isPreview}>
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
