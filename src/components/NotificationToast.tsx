import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import { BiCartDownload } from 'react-icons/bi';
import { useShoppingCart } from '../context/ShoppingCartContext';

import useInterval from 'beautiful-react-hooks/useInterval';


// interface NotificationToastProps {
//     message: string;
//     secondsAgo: number;
//     setSecondsAgo: (secondsAgo: number) => void;
// }

// export function NotificationToast({message, secondsAgo, setSecondsAgo}: NotificationToastProps) {
export function NotificationToast() {
    const { notificationState, setNotificationState } = useShoppingCart();
    const [secondsAgo, setSecondsAgo] = useState<number>(0)
    // console.log('milliseconds ago', secondsAgo * 1000)
    const [delayTime, setDelayTime] = useState<number>(10000)

// TODO set up a seperate functionthat returns a neew toast with the message and seconds ago
// this way we can dynamically have the delay time

    useEffect(() => {
        setSecondsAgo(0);
        //* set delay to amount of time you want it to show (in ms)
        setDelayTime(10000);
    }, [JSON.stringify(notificationState)]);

    // useEffect(() => {
    //     setDelayTime(5000);
    // }, [secondsAgo]);

    useInterval(() => {
        setSecondsAgo(1 + secondsAgo);
    }, 1000);

    return (
        <Toast onClose={() => setNotificationState({ ...notificationState, show: false })}
            show={notificationState.show}
            delay={delayTime} autohide
            bg='success'
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        >
            <Toast.Header>
                <BiCartDownload className='rounded me-2' />
                <strong className="me-auto">Cartotype</strong>
                <small>{secondsAgo} seconds ago</small>
            </Toast.Header>
            <Toast.Body>{notificationState.message}</Toast.Body>
        </Toast>
    );
}