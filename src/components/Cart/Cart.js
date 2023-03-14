import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
   const cartCtx = useContext(CartContext);

   const totalPrice = `$${cartCtx.totalPrice.toFixed(2)}`;
   const hasItems = cartCtx.items.length > 0;

   const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
   };
   const cartItemAddHandler = (item) => {
      cartCtx.addItem({
         ...item,
         amount: 1,
      });
   };

   const cartItems = (
      <ul className={classes["cart-items"]}>
         {cartCtx.items.map((item) => {
            return (
               <CartItem
                  key={item.id}
                  item={item}
                  onRemove={cartItemRemoveHandler.bind(null, item.id)}
                  onAdd={cartItemAddHandler.bind(null, item)}
               />
            );
         })}
      </ul>
   );
   return (
      <Modal onClose={props.hideCart}>
         {cartItems}
         <div className={classes.total}>
            <span>Total Price</span>
            <span>{totalPrice}</span>
         </div>
         <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.hideCart}>
               Close
            </button>
            {hasItems && <button className={classes.button}>Order</button>}
         </div>
      </Modal>
   );
};

export default Cart;
