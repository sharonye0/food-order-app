import { useReducer } from "react";
import React from "react";
import CartContext from "./cart-context";

const defaultCartState = {
   items: [],
   totalPrice: 0,
};

const cartReducer = (state, action) => {
   let updatedItems;
   let updatedTotalPrice;
   let existingCartItemIndex;
   switch (action.type) {
      // SPLIT:
      case "ADD":
         updatedTotalPrice =
            state.totalPrice + action.item.price * action.item.amount;

         existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
         );
         const existingCartItem = state.items[existingCartItemIndex];

         if (existingCartItem) {
            const updatedItem = {
               ...existingCartItem,
               amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
         } else {
            updatedItems = state.items.concat(action.item);
         }

         return {
            items: updatedItems,
            totalPrice: updatedTotalPrice,
         };

      // SPLIT:
      case "REMOVE":
         existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
         );
         const existingItem = state.items[existingCartItemIndex];
         updatedTotalPrice = state.totalPrice - existingItem.price;
         if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
         } else {
            const updatedItem = {
               ...existingItem,
               amount: existingItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
         }
         return {
            items: updatedItems,
            totalPrice: updatedTotalPrice,
         };

      case "CLEAR":
         return defaultCartState;

      // SPLIT:
      default:
         console.error("cartReducer function isn't working as expected");
         return defaultCartState;
   }
};

const CartProvider = (props) => {
   const [cartState, dispatchCartAction] = useReducer(
      cartReducer,
      defaultCartState
   );

   const addItemToCartHandler = (item) => {
      dispatchCartAction({ type: "ADD", item: item });
   };

   const removeItemFromCartHandler = (id) => {
      dispatchCartAction({ type: "REMOVE", id: id });
   };

   const clearCartHandler = () => {
      dispatchCartAction({ type: "CLEAR" });
   };

   const cartContext = {
      items: cartState.items,
      totalPrice: cartState.totalPrice,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
      clearCart: clearCartHandler,
   };
   return (
      <CartContext.Provider value={cartContext}>
         {props.children}
      </CartContext.Provider>
   );
};

export default CartProvider;
