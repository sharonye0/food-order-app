import React, { useState } from "react";
import Header from "./components/Layout/Header";
import CartProvider from "./store/CartProvider";
// import CartContext from "./store/cart-context";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

/*
TODO: 
   1. Adding a Checkout / Order Form
   2. Submitting Orders to a Backend Server (http)
   3. Fetching Meals Data
*/

function App() {
   // const ctx = useContext(CartContext);
   const [cartIsShown, setCartIsShown] = useState(false);

   const showCartHandler = () => {
      setCartIsShown(true);
   };
   const hideCartHandler = () => {
      setCartIsShown(false);
   };

   return (
      <CartProvider>
         {cartIsShown && <Cart hideCart={hideCartHandler} />}
         <Header onShowCart={showCartHandler} />
         <main>
            <Meals />
         </main>
      </CartProvider>
   );
}

export default App;
