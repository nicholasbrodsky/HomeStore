import React, { ChangeEvent } from "react";
import { Route } from "react-router-dom";
import { IStoreItem } from "../../models/storeitem";
import StoreItemDetails from "../../components/StoreItemDetails";
import StoreItemList from "../../components/StoreItemList";
import StoreItemTopBar from "../../components/StoreItemTopBar";

interface IStoreItemDashboardProps {
  storeItems: IStoreItem[];
  handleRemoveStoreItem: (id: string) => void;
  handleUpdateCartQuantity: (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}

const StoreItemDashboard: React.FC<IStoreItemDashboardProps> = ({
  storeItems,
  handleRemoveStoreItem,
  handleUpdateCartQuantity,
}) => {
  const StoreItemDetailsComponent = () => (
    <StoreItemDetails
      storeItems={storeItems}
      handleRemoveStoreItem={handleRemoveStoreItem}
      handleUpdateCartQuantity={handleUpdateCartQuantity}
    />
  );
  return (
    <div className="row">
      <div className="col-md-6">
        <StoreItemList storeItems={storeItems} storeItemPage={true} />
      </div>
      <div className="col-md-5 offset-md-1">
        <StoreItemTopBar />
        <Route path="/storeitems/:id" component={StoreItemDetailsComponent} />
      </div>
    </div>
  );
};

export default StoreItemDashboard;
