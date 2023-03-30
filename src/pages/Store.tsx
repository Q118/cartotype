// import storeItems from '../data/items.json';
// we need to change this to a query
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getStoreItems } from '../api/dataStore';
import Spinner from 'react-bootstrap/Spinner';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import { StoreItem as StoreItemType } from '../types';
// import { ShoppingCart } from '../components/ShoppingCart';

function Store() {

    // TODO: come back and useQuery and set up lazy continuous loading...
    const { data: storeItems, isLoading, error, refetch, isFetching }: any = useQuery({
        queryKey: [`get-all-store-items`],
        queryFn: () => getStoreItems(),
        enabled: true,
    });

    return (
        <>
            {/* {error && <p>Error: {error}</p>} */}
            <h1>Store</h1>

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
            {/* <ShoppingCart /> */}
        </>
    );
}

export { Store };