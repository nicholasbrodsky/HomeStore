import React, { ChangeEvent } from "react";
import { IStoreItem } from "../models/storeitem";
import "../styles/StoreItemDetails.css";
import { RouteComponentProps, withRouter } from "react-router";

interface IStoreItemDetailsProps extends RouteComponentProps<{ id: string }> {
  storeItems: IStoreItem[];
  handleRemoveStoreItem: (id: string) => void;
  handleUpdateCartQuantity: (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}

const StoreItemDetails: React.FC<IStoreItemDetailsProps> = ({
  storeItems,
  handleRemoveStoreItem,
  handleUpdateCartQuantity,
  match: {
    params: { id },
  },
}) => {
  const storeItem = storeItems.filter((storeItem: IStoreItem) => storeItem.id === id)[0];
  if (!storeItem) return (<div></div>);
  return (
    <div className="row store-item-details">
      {/* {console.log(`${id}`)} */}
      <img
        src={`/images/items/${storeItem.image}`}
        className="card-img-top"
        alt="item img"
      />
      <div className="row detail-body">
        <div className="col-md-12">
          <h3>{storeItem.item}</h3>
        </div>
        <div className="col-md-4">
          <span>${storeItem.price}</span>
        </div>
        <div className="col-md-4">
          <span>{storeItem.category}</span>
        </div>
        <div className="col-md-6">
          <span>
            Last Purchased:
            <br />
            {storeItem.lastPurchased}
          </span>
        </div>
        <div className="col-md-6">
          <span>Avg.Home Life: {storeItem.avgDaysInHome} days</span>
        </div>
        <div className="col-md-6">
          <span>Exp: {storeItem.expDate}</span>
        </div>
        <div className="col-md-6">
          <span>{storeItem.runningLow && "Running Low!"}</span>
        </div>
        <div className="col-md-12">
          <span>
            Cart Qty.{" "}
            <input
              type="number"
              min="0"
              value={storeItem.cartQty}
              onChange={(event) =>
                handleUpdateCartQuantity(event, storeItem.id)
              }
            />
          </span>
        </div>
        <div className="col-md-6">
          <a href={`/edititem/${id}`}>
            <input
              type="button"
              value="Edit"
              className="btn btn-primary btn-block"
            />
          </a>
        </div>
        <div className="col-md-6">
          <input
            type="button"
            value="Delete"
            className="btn btn-danger btn-block"
            onClick={() => handleRemoveStoreItem(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(StoreItemDetails);
