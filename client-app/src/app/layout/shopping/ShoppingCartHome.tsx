import React from 'react'
import { IStoreItem } from '../../models/storeitem'
import StoreItemList from '../../components/StoreItemList';

interface IProps {
    cartItems: IStoreItem[];
}

const ShoppingCartHome: React.FC<IProps> = ({cartItems}) => {
    return (
      <div className="row">
        <div className="col-md-6">
          <StoreItemList
            storeItems={cartItems}
          />
        </div>
      </div>
    );
}

export default ShoppingCartHome
