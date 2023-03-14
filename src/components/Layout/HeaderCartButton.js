import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../UI/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
   const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
   const ctx = useContext(CartContext);
   const { items } = ctx;

   const numberOfCartItems = items.reduce((totalAmount, item) => {
      return totalAmount + item.amount;
   }, 0);

   const btnClasses = `${classes.button} ${
      btnIsHighlighted ? classes.bump : ""
   }`;

   useEffect(() => {
      if (items.length === 0) return;
      setBtnIsHighlighted(true);

      let timer = setTimeout(() => {
         setBtnIsHighlighted(false);
      }, 300);
      return () => clearTimeout(timer);
   }, [items]);

   return (
      <button className={btnClasses} onClick={props.onClick}>
         <span className={classes.icon}>
            <CartIcon></CartIcon>
         </span>
         <span>Your Cart</span>
         <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
   );
};
export default HeaderCartButton;
