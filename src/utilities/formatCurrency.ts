/**
 * @description
 * helper methods for formatting currency and consolidating prices
 */
import { StorePrice } from '../types';

const CURRENCY_FORMATTER = new Intl.NumberFormat(
    undefined,
    { currency: 'USD', style: 'currency' }
);

/**
 * @function formatCurrency
 * Formats a number as a currency string.
 */
export function formatCurrency(number: number|null) {
    if (number === null) {
        return '';
    }
    return CURRENCY_FORMATTER.format(number);
}

/**
 * @function consolidateStorePrice
 * Consolidates a StorePrice object into a single number
 */
export function consolidateStorePrice({ dollars, cents }: StorePrice): number {
    return +(dollars + (cents / 100));
}


/**
 * @function decouplePrice
 * Decouples a price into dollars and cents
 */
export const decouplePrice = (price: number): StorePrice => {
    const dollars = Math.floor(price);
    const cents = Math.round((price - dollars) * 100);
    return { dollars, cents };
}