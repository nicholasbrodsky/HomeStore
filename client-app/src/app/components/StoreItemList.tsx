import React, { Fragment } from "react";
import { IStoreItem } from "../models/storeitem";
import StoreItem from "./StoreItem";

interface IProps {
  storeItems: IStoreItem[];
}

const StoreItemList: React.FC<IProps> = ({ storeItems }) => {
  return (
    <Fragment>
      {storeItems.map((storeItem: IStoreItem) => (
        <StoreItem key={storeItem.id} storeItem={storeItem} />
      ))}
    </Fragment>
  );
};

export default StoreItemList;
