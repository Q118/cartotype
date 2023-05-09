import { useEffect } from 'react';
import { BiCartDownload } from 'react-icons/bi';
import { useShoppingCart, NotificationToast as NotificationToastType } from '../context/ShoppingCartContext';
import { useTheme } from '../context/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function DisplayToast() {
    const { notificationToasts, removeNotificationToast } = useShoppingCart();
    const { currentTheme } = useTheme();
    
    useEffect(() => {
        notificationToasts?.forEach((toast) => {
            if (toast.message !== '') {
                notify(toast.message);
                removeNotificationToast(toast.id);
            }
        })

    }, [notificationToasts?.length])

    const notify = (msg: string) => toast.success(msg, { 
        theme: currentTheme, 
        icon: <BiCartDownload /> ,
        position: "top-left",
    });


    return (
        <div>
            <ToastContainer pauseOnFocusLoss={false} />
        </div>
    );
}