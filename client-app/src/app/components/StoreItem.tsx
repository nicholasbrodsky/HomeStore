import React from "react";
import { Link } from "react-router-dom";
import { IStoreItem } from "../models/storeitem";
import '../styles/StoreItem.css'

interface IProps {
  storeItem: IStoreItem;
}

const StoreItem: React.FC<IProps> = ({ storeItem }) => {
  return (
    <div className="store-item row">
      <div className="col-md-6">
        <Link to={`/storeitems/${storeItem.id}`}>
          <img
            src={`/images/items/${storeItem.image}`}
            alt="item"
            className="img-thumbnail"
          />
        </Link>
      </div>
      <div className="col-md-6">
        <h3>{storeItem.item}</h3>
        <div className="row">
          <div className="col-md-4">
            <span>${storeItem.price}</span>
          </div>
          <div className="col-md-8">
            <span>{storeItem.category}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">Cart Qty: {storeItem.cartQty}</div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {storeItem.expDate ? `Exp: ${storeItem.expDate}` : "New Item"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
