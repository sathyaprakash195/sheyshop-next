'use client'
import { cartSlice } from "./CartSlice";
import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./LoadersSlice";
import { usersSlice } from "./UsersSlice";
import { ProductType } from "@/interfaces";

export interface RootStore {
  loaders: any;
  users: any;
  cart: any;
}


let initialCartItems: ProductType[] = [];
if (typeof window !== 'undefined') {
   initialCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
}

const store = configureStore({
  reducer: {
    loaders: loadersSlice.reducer,
    users: usersSlice.reducer,
    cart: cartSlice.reducer,
  },
  preloadedState: {
    cart: {
      items: initialCartItems,
      totalQuantity: initialCartItems.length,
      cartPrice: initialCartItems.reduce(
        (acc: number, item: ProductType) => acc + item.totalPrice,
        0
      ),
    },
  },
});

export default store;
