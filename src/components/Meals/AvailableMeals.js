import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
   const [availableMeals, setAvailableMeals] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchMeals = async () => {
         try {
            setIsLoading(true);
            const res = await fetch(
               "https://food-fb38a-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
            );
            if (!res.ok) throw new Error();

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
            setError(<p> {error.message} </p>);
         }
      };
      fetchMeals();
   }, []);

   const mealsList = availableMeals.map((meal) => (
      <MealItem
         key={meal.id}
         id={meal.id}
         name={meal.name}
         description={meal.description}
         price={meal.price}
      />
   ));

   let content = <ul> {mealsList} </ul>;

   if (isLoading) content = <p> loading... </p>;
   if (error) content = error;

   return (
      <section className={classes.meals}>
         <Card>{content}</Card>
      </section>
   );
};
export default AvailableMeals;
