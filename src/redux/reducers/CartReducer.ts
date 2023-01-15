import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItemProp } from "../../interfaces/CartItemProp";
import { ProductProp } from "../../interfaces/ProductProp";

const initialState: CartItemProp[] = [];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductProp>) => {
      if (action.payload) {
        // check if item of that type is already in the cart
        const found = state.some(
          (item) => item.product.id === action.payload.id
        );
        if (found) {
          const index = state.findIndex(
            (item) => item.product.id === action.payload.id
          );
          state[index].quantity += 1;
        } else {
          state.push({ product: action.payload, quantity: 1 });
        }
      }
    },
    // expects the id of the product to be deleted
    deleteItem: (state, action: PayloadAction<number>) => {
      console.log("delete?");
      const found = state.some((item) => item.product.id === action.payload);
      if (found) {
        const index = state.findIndex(
          (item) => item.product.id === action.payload
        );
        state.splice(index, index + 1);
        console.log("Item deleted successfully");
      } else {
        console.log("Item not found");
      }
    },
    incrementQuantity: (state, action: PayloadAction<ProductProp>) => {
      const found = state.some((item) => item.product.id === action.payload.id);
      if (found) {
        const index = state.findIndex(
          (item) => item.product.id === action.payload.id
        );
        state[index] = { ...state[index], quantity: state[index].quantity + 1 };
      }
    },
    decrementQuantity: (state, action: PayloadAction<ProductProp>) => {
      const found = state.some((item) => item.product.id === action.payload.id);
      if (found) {
        const index = state.findIndex(
          (item) => item.product.id === action.payload.id
        );
        if (state[index].quantity > 1) {
          state[index] = {
            ...state[index],
            quantity: state[index].quantity - 1,
          };
        } else {
          state.splice(index, index + 1);
        }
      }
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addItem, deleteItem, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartReducer;
