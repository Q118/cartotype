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
export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
}

/**
 * @function consolidateStorePrice
 * Consolidates a StorePrice object into a single number
 */
export function consolidateStorePrice({ dollars, cents }: StorePrice): number {
    return +(dollars + (cents / 100));
}