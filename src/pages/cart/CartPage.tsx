import React from "react";
import { useAppSelector } from "../../hooks/reduxHook";
import { ICartItem } from "../../interfaces/ICartItem";
import CartItem from "./components/CartItem";

const CartPage = () => {
  const cart = useAppSelector((state) => {
    return state.cartReducer;
  });

  return (
    <div className="container">
      {cart.map((item: ICartItem, index) => (
        <CartItem
          key={index}
          product={item.product}
          quantity={item.quantity}
        ></CartItem>
      ))}
    </div>
  );
};

export default CartPage;
