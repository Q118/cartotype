import { useEffect } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useQuery } from '@tanstack/react-query';
import { getStoreItems } from '../api/dataStore';
import Spinner from 'react-bootstrap/Spinner';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import { StoreItem as StoreItemType } from '../types';


function Store() {

    const { setGlobalStoreItems } = useShoppingCart();

    // TODO: come back and useQuery and set up lazy continuous loading.../paginationSituation
    const { data: storeItems, isLoading, error, refetch, isFetching }: any = useQuery({
        queryKey: [`get-all-store-items`],
        queryFn: () => getStoreItems(),
        enabled: true,
    });

    useEffect(() => {
        if (storeItems) {
            setGlobalStoreItems(storeItems);
        }
    }, [storeItems]);

    return (
        <>
            <h1>Store</h1>
            {error && <p>Error: {error.message}</p>}
            {(isLoading || isFetching) ? (
                <div>
                    <Spinner animation="grow" variant="success" />
                    <p>Loading...</p>
                    <Spinner animation="grow" variant="success" />
                </div>
            ) : (
                <Row md={2} xs={1} lg={3} className="g-3">
                    {storeItems?.map((item: StoreItemType) => (
                        <Col key={item.id}>
                            <StoreItem {...item} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}

export { Store };