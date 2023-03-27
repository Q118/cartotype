import { useEffect, useState } from 'react';


// ! T represents the type of the value we want to store in localStorage
// * whatever type it is


export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        // return item ? JSON.parse(item) : initialValue;
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof initialValue === 'function') {
            return (initialValue as () => T)();
        } else {
            return initialValue;
        }
    });


    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    // the first two items of the array will always be these types
    return [value, setValue] as [typeof value, typeof setValue];

}

