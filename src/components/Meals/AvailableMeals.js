import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
   const [availableMeals, setAvailableMeals] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   useEffect(() => {
      const fetchMeals = async () => {
         try {
            setIsLoading(true);
            const res = await fetch(
               "https://food-delivery-app-2664d-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
            );
            if (!res.ok) throw new Error("something went wrong!");

            const data = await res.json();
            const loadedMeals = [];
            for (const key in data) {
               loadedMeals.push({
                  id: key,
                  name: data[key].name,
                  description: data[key].description,
                  price: data[key].price,
               });
            }

            setAvailableMeals(loadedMeals);
            setIsLoading(false);
         } catch (error) {
            setIsLoading(false);
            setError(<p> {error.message} </p>);
         }
      };
      fetchMeals();
   }, []);

   if (isLoading) {
      return (
         <section className={classes.MealsLoading}>
            <p> loading... </p>
         </section>
      );
   }
   if (error) {
      return (
         <section className={classes.MealsError}>
            <p> {error} </p>
         </section>
      );
   }

   const mealsList = availableMeals.map((meal) => (
      <MealItem
         key={meal.id}
         id={meal.id}
         name={meal.name}
         description={meal.description}
         price={meal.price}
      />
   ));

   return (
      <section className={classes.meals}>
         <Card>
            <ul> {mealsList} </ul>
         </Card>
      </section>
   );
};
export default AvailableMeals;
