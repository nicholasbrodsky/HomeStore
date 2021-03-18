import React from 'react'
import { IStoreItem } from '../models/storeitem'

interface IStoreItemTopBarProps {
    storeItems: IStoreItem[];
}

const StoreItemTopBar: React.FC<IStoreItemTopBarProps> = ({storeItems}) => {
    const storeItemsInCart: number = storeItems.filter((storeItem: IStoreItem) => storeItem.cartQty > 0).length;
    let totalCartItems: number = 0;
    let totalPrice: number = 0;
    storeItems.forEach((storeItem: IStoreItem) => {
        totalCartItems += storeItem.cartQty;
        totalPrice += parseFloat(storeItem.price) * storeItem.cartQty;
    });
    return (
      <div className="row">
        <span>
          Cart Qty: {storeItemsInCart} (Total Items: {totalCartItems})
        </span>
        &nbsp;&nbsp;
        <span>Total Price: ${totalPrice}</span>
        <hr />
      </div>
    );
}

export default StoreItemTopBar
