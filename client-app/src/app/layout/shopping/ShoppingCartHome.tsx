import React, { ChangeEvent } from 'react'
import { IStoreItem } from '../../models/storeitem'
import StoreItemList from '../../components/StoreItemList';
import StoreItemTopBar from '../../components/StoreItemTopBar';
import { Route } from 'react-router';
import StoreItemDetails from '../../components/StoreItemDetails';

interface IProps {
  cartItems: IStoreItem[];
  handleRemoveStoreItem: (id: string) => void;
  handleUpdateCartQuantity: (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}

const ShoppingCartHome: React.FC<IProps> = ({cartItems, handleRemoveStoreItem, handleUpdateCartQuantity}) => {
  const StoreItemDetailsComponent = () => (
    <StoreItemDetails
      storeItems={cartItems}
      handleRemoveStoreItem={handleRemoveStoreItem}
      handleUpdateCartQuantity={handleUpdateCartQuantity}
    />
  );
    return (
      <div className="row">
        <div className="col-md-6">
          <StoreItemList storeItems={cartItems} storeItemPage={false} />
        </div>
        <div className="col-md-5 offset-md-1">
          <StoreItemTopBar />
          <Route path="/shoppinglist/:id" component={StoreItemDetailsComponent} />
        </div>
      </div>
    );
}

export default ShoppingCartHome
