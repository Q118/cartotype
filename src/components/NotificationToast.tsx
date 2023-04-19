import Toast from 'react-bootstrap/Toast';
import { BiCartDownload } from 'react-icons/bi';
import { useShoppingCart } from '../context/ShoppingCartContext';


export function NotificationToast() {
    const { notificationState, setNotificationState } = useShoppingCart();

    //* set delay to amount of time you want it to show (in ms)

    return (
        <Toast onClose={() => setNotificationState({ ...notificationState, show: false })}
            show={notificationState.show}
            delay={3600} autohide
            bg='success'
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        >
            <Toast.Header>
                <BiCartDownload className='rounded me-2' />
                <strong className="me-auto">Cartotype</strong>
                <small>11 mins ago</small>
                {/* //TODO make this actually say how long ago */}
            </Toast.Header>
            <Toast.Body>{notificationState.message}</Toast.Body>
        </Toast>
    );
}