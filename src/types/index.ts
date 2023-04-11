/** 
 * @type ResultItem
 * @description ResultItems are the items that are returned by the search function
 * as well as the item selected to be added to the store
 */
export type ResultItem = {
    id: string;
    description: string;
    imgUrl: string;
    downloadLocation: string;
    displayName: string;
    name: string;
}

export type StorePrice = {
    dollars: number;
    cents: number;
}

export type StoreItem = {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
};