/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";

import classes from "./Header.module.css";

import mealsImage from "../../assets/meals.jpg";

const Header = (props) => {
   return (
      <Fragment>
         <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
         </header>
         <div className={classes["main-image"]}>
            <img src={mealsImage} />
         </div>
      </Fragment>
   );
};

export default Header;
