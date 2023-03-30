/** 
 * @description - crud operations on store items
*/
import fs from 'fs';
import { StoreItem } from '../types';
import storeItems from '../data/items.json';


/**
 * 
 * @param {StoreItem} item
 * @returns boolean - indicates whether the item was added to the store successfully
 */
export async function addToStore(item: StoreItem) {
    try {
        // add the item to the end of the array in the data.json file
        storeItems.push(item);
        // write the new array to the data.json file
        await fs.promises.writeFile('./src/data/items.json', JSON.stringify(storeItems));
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
}

