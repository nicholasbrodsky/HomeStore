import React, { Fragment } from "react";
import { IStoreItem } from "../models/storeitem";
import StoreItem from "./StoreItem";

interface IProps {
  storeItems: IStoreItem[];
  storeItemPage: boolean;
}

const StoreItemList: React.FC<IProps> = ({ storeItems, storeItemPage }) => {
  return (
    <Fragment>
      {storeItems.map((storeItem: IStoreItem) => (
        <StoreItem key={storeItem.id} storeItem={storeItem} storeItemPage={storeItemPage} />
      ))}
    </Fragment>
  );
};

export default StoreItemList;
