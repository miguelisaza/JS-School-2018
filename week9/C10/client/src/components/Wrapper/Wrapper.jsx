import React from "react";
import injectSheet from "react-jss";
import Filters from "../Filters/Filters";
import Trends from "../Trends";
import BooksContainer from "../BooksContainer/BooksContainer";
import wrapperStyle from "./wrapperStyle";

const Wrapper = ({ classes: { wrapper } }) => (
  <div className={wrapper}>
    <Filters />
    <BooksContainer />
    <Trends />
  </div>
);

const Wrap = injectSheet(wrapperStyle)(Wrapper);

export default Wrap;
