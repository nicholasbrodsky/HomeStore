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
    axios
      .get("https://localhost:5001/api/storeitems", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTkJST0RTS1kiLCJuYW1laWQiOiJlZmFmMWE5YS02YTk5LTQxZTQtOGE4My04YzgxY2RhOGYyOGEiLCJlbWFpbCI6Ik5JQ0tATUUuQ09NIiwibmJmIjoxNjE2MzAxNjIyLCJleHAiOjE2MTY5MDY0MjIsImlhdCI6MTYxNjMwMTYyMn0.2m6tAE7dhHhl6k4tpNKqBVszFAs1BlJv8OPMqLG2xIs`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        const tempStoreItems: IStoreItem[] = [];
        response.data.forEach((sItem: IStoreItem) => {
          sItem.lastPurchased = sItem.lastPurchased?.split("T")[0];
          sItem.expDate = sItem.expDate?.split("T")[0];
          sItem.details = !sItem.details ? "" : sItem.details; // set to empty string (null/undefined raises warning in controlled component (input form))
          tempStoreItems.push(sItem);
        });
        setStoreItems(
          tempStoreItems.sort((a: IStoreItem, b: IStoreItem) =>
            a.item > b.item ? 1 : -1
          )
        );
      });
  }, []);
  useEffect(() => {
    console.log("App.tsx cart item useEffect");
    setCartItems(
      [
        ...storeItems.filter((storeItem: IStoreItem) => storeItem.cartQty > 0),
      ].sort((a: IStoreItem, b: IStoreItem) => (a.item > b.item ? 1 : -1))
    );
  }, [storeItems]);

  const handleCreateStoreItem = (newStoreItem: IStoreItem) => {
    // console.log(newStoreItem);
    axios
      .post("https://localhost:5001/api/storeitems", newStoreItem)
      .then((response) => {
        console.log(response.status);
        setStoreItems(
          [...storeItems, newStoreItem].sort((a: IStoreItem, b: IStoreItem) =>
            a.item > b.item ? 1 : -1
          )
        );
      });
  };
  const handleEditStoreItem = (updatedStoreItem: IStoreItem) => {
    // console.log(updatedStoreItem);
    // updatedStoreItem.p
    // alert(updatedStoreItem.price);
    axios
      .put(
        `https://localhost:5001/api/storeitems/${updatedStoreItem.id}`,
        updatedStoreItem
      )
      .then((response) => {
        // console.log(response.status);
        if (response.status === 200) {
          setStoreItems(
            [
              ...storeItems.filter(
                (storeItem: IStoreItem) => storeItem.id !== updatedStoreItem.id
              ),
              updatedStoreItem,
            ].sort((a: IStoreItem, b: IStoreItem) => (a.item > b.item ? 1 : -1))
          );
          // <Redirect to="/storeitems" />;
        }
      });
  };
  const handleRemoveStoreItem = (id: string) => {
    axios
      .delete(`https://localhost:5001/api/storeitems/${id}`)
      .then((response) => {
        setStoreItems(
          [
            ...storeItems.filter(
              (storeItem: IStoreItem) => storeItem.id !== id
            ),
          ].sort((a: IStoreItem, b: IStoreItem) => (a.item > b.item ? 1 : -1))
        );
      });
  };
  const handleUpdateCartQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { valueAsNumber } = event.target;
    const updatedStoreItem: IStoreItem = storeItems.filter(
      (item: IStoreItem) => item.id === id
    )[0];
    updatedStoreItem.cartQty = valueAsNumber;
    axios
      .put(`https://localhost:5001/api/storeitems/${id}`, updatedStoreItem)
      .then((respose) => {
        if (respose.status === 200) {
          setStoreItems(
            [
              ...storeItems.filter((item: IStoreItem) => item.id !== id),
              updatedStoreItem,
            ].sort((a: IStoreItem, b: IStoreItem) => (a.item > b.item ? 1 : -1))
          );
          setCartItems(
            [
              ...storeItems.filter((item: IStoreItem) => item.cartQty > 0),
            ].sort((a: IStoreItem, b: IStoreItem) => (a.item > b.item ? 1 : -1))
          );
        } else {
          alert("ERROR updating cart quantity!");
        }
      });
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
    <ShoppingCartHome
      cartItems={cartItems}
      handleRemoveStoreItem={handleRemoveStoreItem}
      handleUpdateCartQuantity={handleUpdateCartQuantity}
    />
  );
  const StoreItemFormComponent = () => (
    <StoreItemForm
      storeItems={storeItems}
      handleCreateStoreItem={handleCreateStoreItem}
      handleEditStoreItem={handleEditStoreItem}
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
