import { ProductType } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  items: ProductType[];
  totalQuantity: number;
  cartPrice: number;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    cartPrice: 0,
  } as CartState,
  reducers: {
    AddItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem: ProductType = state.items.find(
        (item) => item._id === newItem._id
      ) as any;
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }

      state.cartPrice = state.items.reduce(
        (acc: number, item: ProductType) => acc + item.totalPrice,
        0
      );
    },

    RemoveItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem: ProductType = state.items.find(
        (item) => item._id === id
      ) as any;
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }

      state.cartPrice = state.items.reduce(
        (acc: number, item: ProductType) => acc + item.totalPrice,
        0
      );
    },

    SetItems: (state, action) => {
      state.items = action.payload;
      state.totalQuantity = state.items.reduce(
        (acc: number, item: ProductType) => acc + item.quantity,
        0
      );
      state.cartPrice = state.items.reduce(
        (acc: number, item: ProductType) => acc + item.totalPrice,
        0
      );
    },

    ClearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.cartPrice = 0;
    },

    ClearItemInCart: (state, action) => {
      const id = action.payload;
      const existingItem: ProductType = state.items.find(
        (item) => item._id === id
      ) as any;
      state.totalQuantity = state.totalQuantity - existingItem.quantity;
      state.cartPrice = state.cartPrice - existingItem.totalPrice;
      state.items = state.items.filter((item) => item._id !== id);
    },
  },
});

export const { AddItemToCart, RemoveItemFromCart, ClearCart, SetItems , ClearItemInCart } =
  cartSlice.actions;
