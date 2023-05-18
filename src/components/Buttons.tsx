import Button from 'react-bootstrap/Button';


export function CartButton(title: string, clickHandler: any) {
    return (
        <Button variant="outline-light" className="cart-button" onClick={clickHandler}>
            {title}
        </Button>
    )
}