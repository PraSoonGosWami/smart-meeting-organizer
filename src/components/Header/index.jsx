import React from "react";
import { Link } from "react-router-dom";
import classes from "./styles.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <img src="/assets/meeting.svg" width={40} height={40} alt="SMO logo" />
        <h2>Meet Organiser</h2>
      </Link>
    </header>
  );
};

export default React.memo(Header);
