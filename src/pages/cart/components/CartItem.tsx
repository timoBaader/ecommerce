import { Button, Typography } from "@mui/material";

import { useAppDispatcher } from "../../../hooks/reduxHook";
import { CartItemProp } from "../../../interfaces/CartItemProp";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../../redux/reducers/cartReducer";

const CartItem = (item: CartItemProp) => {
  const dispatch = useAppDispatcher();

  return (
    <div className="cartItem margin-bottom">
      <img src={item.product.images[0]} alt="product"></img>
      <Typography className="margin-left cartItem-title">
        {item.product.title}
      </Typography>
      <Typography className="margin-left cartItem-price">
        {item.product.price}€
      </Typography>
      <div className="margin-left">
        <Button onClick={() => dispatch(incrementQuantity(item.product))}>
          +
        </Button>
        <span>{item.quantity}</span>
        <Button onClick={() => dispatch(decrementQuantity(item.product))}>
          -
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
