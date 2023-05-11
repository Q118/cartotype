import Spinner from 'react-bootstrap/Spinner';


export function LoadingDivComponent() {
    return (
        <div className="text-center">
            <Spinner animation="grow" variant="success" size="sm" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="success" size="sm" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="success" size="sm" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="success" size="sm" />
            <Spinner animation="grow" variant="success" />
        </div>
    )
}