import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
   const [isCheckout, setIsCheckout] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [didSubmit, setDidSubmit] = useState(false);
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

   const orderHandler = () => {
      setIsCheckout(true);
   };

   const submitOrderHandler = async (userData) => {
      setIsSubmitting(true);
      const res = await fetch(
         "https://food-delivery-app-2664d-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
         {
            method: "POST",
            body: JSON.stringify({
               user: userData,
               orderedItems: cartCtx.items,
            }),
         }
      );
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
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

   const modalActions = (
      <div className={classes.actions}>
         <button className={classes["button--alt"]} onClick={props.hideCart}>
            Close
         </button>
         {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
               Order
            </button>
         )}
      </div>
   );

   const cartModalContent = (
      <>
         {cartItems}
         <div className={classes.total}>
            <span>Total Price</span>
            <span>{totalPrice}</span>
         </div>
         {isCheckout && (
            <Checkout
               onConfirm={submitOrderHandler}
               onCancel={props.hideCart}
            />
         )}
         {!isCheckout && modalActions}
      </>
   );

   const isSubmittingModalContent = <p>Sending order data...</p>;

   const didSubmitModalContent = (
      <>
         <p>Successfully sent the order!</p>
         <div className={classes.actions}>
            <button className={classes.button} onClick={props.hideCart}>
               Close
            </button>
         </div>
      </>
   );

   return (
      <Modal onClose={props.hideCart}>
         {!isSubmitting && !didSubmit && cartModalContent}
         {isSubmitting && isSubmittingModalContent}
         {!isSubmitting && didSubmit && didSubmitModalContent}
      </Modal>
   );
};

export default Cart;
