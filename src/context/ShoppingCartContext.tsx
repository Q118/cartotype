import { ReactNode, createContext, useContext, useState } from 'react';


type ShoppingCartProviderProps = {
    children: ReactNode;
};

type CartItem = {
    id: number;
    quantity: number;
};


type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
};

// make it contain the values of the type this way
const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    // this calculates the total quantity of items in the cart
    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id: number) {
        // if the find, return the quantity, otherwise return 0
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }
    function increaseCartQuantity(id: number) {
        setCartItems((currentItems) => {
            if (currentItems.find((item) => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }];
            } else {
                // if ya do find it:
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        })
    }
    function decreaseCartQuantity(id: number) {
        setCartItems((currentItems) => {
            if (currentItems.find((item) => item.id === id)?.quantity === 1) {
                // then get rid of it
                return currentItems.filter((item) => item.id !== id);
            } else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        })
    }
    function removeFromCart(id: number) {
        setCartItems((currentItems) => {
            return currentItems.filter((item) => item.id !== id);
        })
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart,
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
