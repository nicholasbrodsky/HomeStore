import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { IStoreItem } from "./models/storeitem";
import StoreItemDashboard from "./layout/storeitems/StoreItemDashboard";
import Navbar from "./layout/navbar/Navbar";
import ShoppingCartHome from "./layout/shopping/ShoppingCartHome";
import axios from "axios";
import Home from "./layout/home/Home";
import StoreItemForm from "./components/StoreItemForm";

const App = () => {
  const [storeItems, setStoreItems] = useState<IStoreItem[]>([]);
  const [cartItems, setCartItems] = useState<IStoreItem[]>([]);

  useEffect(() => {
    console.log("App.tsx store item useEffect");
    axios.get("https://localhost:5001/api/storeitems").then((response) => {
      console.log(response.data);
      const tempStoreItems: IStoreItem[] = [];
      response.data.forEach((sItem: IStoreItem) => {
        sItem.lastPurchased = sItem.lastPurchased?.split("T")[0];
        sItem.expDate = sItem.expDate?.split("T")[0];
        tempStoreItems.push(sItem);
      });
      setStoreItems(tempStoreItems);
    });
  }, []);
  useEffect(() => {
    console.log("App.tsx cart item useEffect");
    setCartItems([
      ...storeItems.filter((storeItem: IStoreItem) => storeItem.cartQty > 0),
    ]);
  }, [storeItems]);

  const handleCreateStoreItem = (newStoreItem: IStoreItem) => {
    console.log(newStoreItem);
    axios
      .post("https://localhost:5001/api/storeitems", newStoreItem)
      .then((response) => {
        console.log(response.status);
        setStoreItems([...storeItems, newStoreItem]);
      });
  };
  const handleRemoveStoreItem = (id: string) => {
    axios
      .delete(`https://localhost:5001/api/storeitems/${id}`)
      .then((response) => {
        setStoreItems(
          storeItems.filter((storeItem: IStoreItem) => storeItem.id !== id)
        );
      });
  };
  const handleUpdateCartQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { valueAsNumber } = event.target;
    const tempStoreItem: IStoreItem = storeItems.filter(
      (item: IStoreItem) => item.id === id
    )[0];
    tempStoreItem.cartQty = valueAsNumber;
    setStoreItems(
      [
        ...storeItems.filter((item: IStoreItem) => item.id !== id),
        tempStoreItem,
      ].sort(
        (item1: IStoreItem, item2: IStoreItem) =>
          parseInt(item1.id) - parseInt(item2.id)
      )
    );
    setCartItems([
      ...storeItems.filter((item: IStoreItem) => item.cartQty > 0),
    ]);
  };

  const HomeComponent = () => <Home />;
  const StoreItemDashboardComponent = () => (
    <StoreItemDashboard
      storeItems={storeItems}
      handleRemoveStoreItem={handleRemoveStoreItem}
      handleUpdateCartQuantity={handleUpdateCartQuantity}
    />
  );
  const ShoppingCartHomeComponent = () => (
    <ShoppingCartHome cartItems={cartItems} />
  );
  const StoreItemFormComponent = () => (
    <StoreItemForm
      storeItems={storeItems}
      handleCreateStoreItem={handleCreateStoreItem}
    />
  );

  return (
    <Fragment>
      <Navbar />
      <div className="container" style={{ marginTop: "4em" }}>
        <Switch>
          <Route path="/" exact component={HomeComponent} />
          <Route path="/storeitems" component={StoreItemDashboardComponent} />
          <Route path="/shoppinglist" component={ShoppingCartHomeComponent} />
          <Route path="/createitem" component={StoreItemFormComponent} />
          <Route path="/edititem/:id" component={StoreItemFormComponent} />
          {/* <Route path='/runninglow' /> */}
        </Switch>
      </div>
    </Fragment>
  );
};

export default App;
