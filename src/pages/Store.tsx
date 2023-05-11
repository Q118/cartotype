// import { useEffect } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
// import { useQuery } from '@tanstack/react-query';
// import { getStoreItems } from '../api/dataStore';
import Spinner from 'react-bootstrap/Spinner';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import { StoreItem as StoreItemType } from '../types';


function Store() {

    const { globalStoreItems, isStoreItemsLoading, storeItemsError } = useShoppingCart();

    // TODO: come back and useQuery and set up lazy continuous loading.../paginationSituation
    // * for the images while they are white and loading.. display react-skeleton

    return (
        <>
            <h1>Store</h1>
            {storeItemsError && <p>Error: {storeItemsError.message}</p>}
            {isStoreItemsLoading() === true &&
                (<div>
                    <Spinner animation="grow" variant="success" />
                    <p>Loading...</p>
                    <Spinner animation="grow" variant="success" />
                </div>)}
            {isStoreItemsLoading() === false && (
                <Row md={2} xs={1} lg={3} className="g-3">
                    {globalStoreItems?.map((item: StoreItemType) => (
                        <Col key={item.id}>
                            <StoreItem {...item} isPreview={false} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}

export { Store };