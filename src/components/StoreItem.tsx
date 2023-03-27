import Card from 'react-bootstrap/Card';
import { formatCurrency } from '../utilities/formatCurrency';

const TITLE_CLASSES:string = 'd-flex justify-content-between align-items-baseline mb-4';

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    return (
        <>
            <Card>
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


                </Card.Body>
            </Card>
        </>
    );
}
