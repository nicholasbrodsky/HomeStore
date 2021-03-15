export interface IStoreItem {
    id: string;
    item: string;
    category: string;
    price: string;
    image?: string;
    lastPurchased?: string;
    expDate?: string;
    avgDaysInHome?: number;
    runningLow: boolean;
    cartQty: number;
    qtyLastPurchased: number;
}
