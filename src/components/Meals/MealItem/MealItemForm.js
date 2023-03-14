import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";
// import CartContext from "../../../store/cart-context";

const MealItemForm = (props) => {
   const [amountIsValid, setAmountIsValid] = useState(true);
   const amountInputRef = useRef();
   // const ctx = useContext(CartContext);

   const submitFormHandler = (e) => {
      e.preventDefault();
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;

      if (
         enteredAmount.trim().length === 0 ||
         enteredAmountNumber < 1 ||
         enteredAmountNumber > 5
      ) {
         setAmountIsValid(false);
         return;
      }
      props.onAddToCart(enteredAmountNumber);
   };
   return (
      <form className={classes.form} onSubmit={submitFormHandler}>
         <Input
            ref={amountInputRef}
            label={"Amount"}
            input={{
               id: props.id,
               type: "number",
               min: "1",
               max: "5",
               step: "1",
               defaultValue: "1",
            }}
         />
         <button type="submit">Add</button>
         {!amountIsValid && <p>Please Enter a Valid Amount (1-5).</p>}
      </form>
   );
};

export default MealItemForm;
