import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { formatCurrency } from '../utilities/formatCurrency';

const TITLE_CLASSES: string = 'd-flex justify-content-between align-items-baseline mb-4';
const INNER_BTN_CLASSES: string = 'd-flex align-items-center flex-column';

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {


    const quantity: number = 0;

    return (
        <>
            <Card className='h-100'>
                <Card.Img
                    variant="top"
                    src={imgUrl}
                    height="200px"
                    style={{ objectFit: 'cover' }}
                />
                <Card.Body className='d-flex flex-column bg-secondary text-light'>
                    <Card.Title className={TITLE_CLASSES}>
                        <span className='fs-2'>{name}</span>
                        <span className='ms-2'>{formatCurrency(price)}</span>
                    </Card.Title>
                    {/* mt-auto to fill all aviailable  space */}
                    <div className='mt-auto'>
                        {quantity === 0 ? (
                            <Button className='w-100'>
                                + Add To Cart
                            </Button>
                        ) : (
                            <div className={INNER_BTN_CLASSES} style={{ gap: ".5rem" }}>
                                <div className='d-flex align-items-center justify-content-center' style={{ gap: ".5rem" }}>
                                    <Button>-</Button>
                                    <div>
                                        <span className='fs-3'>{quantity}</span> in cart
                                    </div>
                                    <Button>+</Button>
                                </div>
                                <Button variant="danger" size='sm'>Remove</Button>
                            </div>
                        )}
                    </div>

                </Card.Body>
            </Card>
        </>
    );
}
