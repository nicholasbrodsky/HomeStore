import React, { ChangeEvent, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { IStoreItem } from "../models/storeitem";
import {v4 as uuid} from 'uuid'

interface IStoreItemFormProps extends RouteComponentProps<{ id: string }> {
  storeItems: IStoreItem[];
  handleCreateStoreItem: (storeItem: IStoreItem) => void;
  handleEditStoreItem: (storeItem: IStoreItem) => void;
}

const StoreItemForm: React.FC<IStoreItemFormProps> = ({
  storeItems,
  handleCreateStoreItem,
  handleEditStoreItem,
  match: {
    params: { id },
  },
}) => {
  const storeItemInit: IStoreItem = storeItems.filter(
    (storeItem: IStoreItem) => storeItem.id === id
  )[0];
  const initForm = () => {
    if (storeItemInit) return storeItemInit;
    else
      return {
        id: "",
        item: "",
        category: "",
        price: '',
        image: "",
        runningLow: false,
        cartQty: 0,
        qtyLastPurchased: 0,
      };
  };
  const [storeItem, setStoreItem] = useState<IStoreItem>(initForm);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setStoreItem({ ...storeItem, [name]: value });
  };
  const handleSubmitForm = () => {
    if (!storeItem.id) {
        const newStoreItem: IStoreItem = {
            ...storeItem,
            id: uuid()
        };
        alert(newStoreItem.id);
        handleCreateStoreItem(newStoreItem);
    }
    else{
      handleEditStoreItem(storeItem);
    }
  };
  return (
    <div className="row">
      <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Store Item"
                name="item"
                value={storeItem.item}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Category"
                name="category"
                value={storeItem.category}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                name="price"
                value={storeItem.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Image"
                name="image"
                value={storeItem.image}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmitForm}
              >
                Submit
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default withRouter(StoreItemForm);
