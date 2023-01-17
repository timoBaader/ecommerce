import { Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/reduxHook";
import { CartItemProp } from "../../interfaces/cart/CartItemProp";
import CartItem from "./components/CartItem";

const CartPage = () => {
  const cart = useAppSelector((state) => {
    return state.cartReducer;
  });

  return (
    <div className="container">
      {cart.length > 0 ? (
        cart.map((item: CartItemProp, index) => (
          <CartItem
            key={index}
            product={item.product}
            quantity={item.quantity}
          ></CartItem>
        ))
      ) : (
        <Typography>Your cart is empty</Typography>
      )}
      {cart.length > 0 && (
        <Typography className="cart-totalPrice">
          Total price:{" "}
          {cart.reduce((acc, obj) => {
            return acc + obj.product.price * obj.quantity;
          }, 0)}
          €
        </Typography>
      )}
    </div>
  );
};

export default CartPage;
